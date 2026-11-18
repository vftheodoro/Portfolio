import { test } from "node:test";
import assert from "node:assert/strict";
import { planChoreography, planDuration } from "../planner.ts";
import { SectionTimeline, type TimelineEnv } from "../timeline.ts";
import { FLUSH_VELOCITY, FrameBudget, isInView, isPassed, resolveMode, speedForVelocity } from "../motion.ts";
import { anchorAt } from "../cursorPath.ts";
import { shape } from "../math.ts";
import { presetFor } from "../presets.ts";
import type { Geometry, TargetDescriptor } from "../types.ts";

const d = (id: string, kind: TargetDescriptor["kind"], order: number, group = "g0", chars?: number): TargetDescriptor => ({
  id,
  kind,
  order,
  group,
  chars,
});

const sample: TargetDescriptor[] = [
  d("f0", "frame", 0),
  d("title0", "type", 1, "g0", 24),
  d("img0", "media", 2),
  d("chip0a", "chip", 3),
  d("chip0b", "chip", 4),
  d("link0", "link", 5),
  d("f1", "frame", 6, "g1"),
  d("title1", "type", 7, "g1", 18),
  d("chip1a", "chip", 8, "g1"),
];

const geom = (x: number, y: number, w = 200, h = 80): Geometry => ({ rect: { x, y, w, h } });
const env = (visible: (id: string) => boolean = () => true): TimelineEnv => ({
  isVisible: visible,
  getGeom: (id) => geom(id.length * 10, 100),
});

test("planner é determinístico", () => {
  const a = planChoreography(sample, presetFor("projects"));
  const b = planChoreography(sample, presetFor("projects"));
  assert.deepEqual(a, b);
});

test("planner: um cursor nunca tem duas tarefas sobrepostas (incluindo deslocamento)", () => {
  for (const name of ["hero", "about", "projects", "experience", "stack", "contact", "ai"]) {
    for (const lite of [false, true]) {
      const tasks = planChoreography(sample, presetFor(name), { lite });
      const bySlot = new Map<number, typeof tasks>();
      tasks.forEach((t) => bySlot.set(t.slot, [...(bySlot.get(t.slot) ?? []), t]));
      for (const list of bySlot.values()) {
        for (let i = 1; i < list.length; i++) {
          const prev = list[i - 1];
          assert.ok(
            list[i].start - list[i].travel >= prev.start + prev.duration,
            `${name}${lite ? "/lite" : ""}: ${list[i].id} sobrepõe ${prev.id}`,
          );
        }
      }
    }
  }
});

test("planner: respeita o limite de cursores e coreografias diferem por cena", () => {
  const hero = planChoreography(sample, presetFor("hero"));
  assert.ok(Math.max(...hero.map((t) => t.slot)) < presetFor("hero").cursors);
  const lite = planChoreography(sample, presetFor("hero"), { lite: true });
  assert.ok(Math.max(...lite.map((t) => t.slot)) <= 2, "lite usa no máximo 3 cursores");
  assert.ok(lite.every((t) => t.kind !== "chip" && t.kind !== "line"), "lite não anima chips/linhas");
  assert.ok(planDuration(lite) < planDuration(hero));
  const sig = (n: string) => JSON.stringify(planChoreography(sample, presetFor(n)).map((t) => [t.targetId, t.slot, t.start]));
  assert.notEqual(sig("projects"), sig("about"));
  assert.notEqual(sig("stack"), sig("experience"));
});

test("planner: cena 'projects' duplica moldura e chips a partir do anterior; hero não", () => {
  const proj = planChoreography(sample, presetFor("projects"));
  assert.equal(proj.find((t) => t.targetId === "f1")?.dupFrom, "f0");
  assert.equal(proj.find((t) => t.targetId === "chip0b")?.dupFrom, "chip0a");
  const hero = planChoreography(sample, presetFor("hero"));
  assert.ok(hero.every((t) => !t.dupFrom));
});

test("hero: ordem da abertura moldura -> chips(nav) -> nome -> mídia", () => {
  const t = planChoreography(sample, presetFor("hero"));
  const start = (id: string) => t.find((x) => x.targetId === id)!.start;
  assert.ok(start("f0") < start("chip0a"));
  assert.ok(start("chip0a") < start("title0"));
  assert.ok(start("title0") < start("img0"));
});

test("timeline: conclui todas as tarefas e o progresso é monotônico", () => {
  const tasks = planChoreography(sample, presetFor("projects"));
  const tl = new SectionTimeline(tasks);
  const e = env();
  const last = new Map<string, number>();
  let guard = 0;
  while (!tl.finished && guard++ < 5000) {
    tl.tick(16, 1, e);
    for (const t of tasks) {
      const p = tl.progress(t);
      assert.ok(p >= (last.get(t.id) ?? 0) - 1e-9, `${t.id} regrediu`);
      assert.ok(p >= 0 && p <= 1);
      last.set(t.id, p);
    }
  }
  assert.ok(tl.finished);
  assert.ok(guard < 5000, "deve terminar em tempo finito");
});

test("timeline: alvo fora da viewport espera; só começa quando visível", () => {
  const tasks = planChoreography(sample, presetFor("cascade" in {} ? "x" : "contact"));
  const tl = new SectionTimeline(tasks);
  let visible = false;
  const e = env((id) => (id === "link0" ? visible : true));
  for (let i = 0; i < 400; i++) tl.tick(16, 1, e);
  const link = tasks.find((t) => t.targetId === "link0")!;
  assert.equal(tl.status(link.id), "waiting");
  assert.equal(tl.finished, false);
  visible = true;
  for (let i = 0; i < 200; i++) tl.tick(16, 1, e);
  assert.equal(tl.status(link.id), "done");
});

test("timeline: velocidade maior termina antes", () => {
  const run = (speed: number) => {
    const tl = new SectionTimeline(planChoreography(sample, presetFor("projects")));
    let n = 0;
    while (!tl.finished && n < 10000) {
      tl.tick(16, speed, env());
      n++;
    }
    return n;
  };
  assert.ok(run(3) < run(1));
});

test("timeline: flush conclui tudo e devolve ids pendentes; flushTask é idempotente", () => {
  const tasks = planChoreography(sample, presetFor("projects"));
  const tl = new SectionTimeline(tasks);
  tl.tick(16, 1, env());
  assert.equal(tl.flushTask(tasks[0].id), true);
  assert.equal(tl.flushTask(tasks[0].id), false);
  const ids = tl.flush();
  assert.ok(ids.length >= tasks.length - 1);
  assert.ok(tl.finished);
  tasks.forEach((t) => assert.equal(tl.progress(t), 1));
});

test("cursores: aparecem só ao chegar, ficam visíveis durante a tarefa e somem depois", () => {
  const tasks = planChoreography(sample, presetFor("contact"));
  const tl = new SectionTimeline(tasks);
  const e = env();
  assert.ok(tl.frames(e).every((f) => !f.visible), "antes de começar ninguém aparece");
  let sawVisible = false;
  let n = 0;
  while (!tl.settled && n++ < 5000) {
    tl.tick(16, 1, e);
    if (tl.frames(e).some((f) => f.visible)) sawVisible = true;
  }
  assert.ok(sawVisible);
  assert.ok(tl.settled);
  assert.ok(tl.frames(e).every((f) => !f.visible));
});

test("cursores: durante a moldura o cursor está sobre o canto em crescimento", () => {
  const g = geom(100, 200, 400, 300);
  const half = shape("frame", 0.5);
  const a = anchorAt("frame", half, g);
  assert.equal(a.x, 100 + 400 * half);
  assert.equal(a.y, 200 + 300 * half);
  assert.deepEqual(anchorAt("frame", 0, g), { x: 100, y: 200 });
  assert.deepEqual(anchorAt("frame", 1, g), { x: 500, y: 500 });
});

test("cursores: digitação segue os carets medidos", () => {
  const carets = [0, 10, 20, 30].map((x) => ({ x, y: 50 }));
  const g: Geometry = { rect: { x: 0, y: 40, w: 30, h: 20 }, carets };
  assert.deepEqual(anchorAt("type", 0, g), { x: 0, y: 50 });
  assert.deepEqual(anchorAt("type", 1, g), { x: 30, y: 50 });
  assert.equal(anchorAt("type", 0.5, g).x, 15);
});

test("fantasmas de duplicação existem só durante a tarefa", () => {
  const tasks = planChoreography(sample, presetFor("projects"));
  const dup = tasks.find((t) => t.dupFrom)!;
  const tl = new SectionTimeline(tasks);
  const e = env();
  assert.equal(tl.ghosts(e).length, 0);
  let seen = false;
  for (let i = 0; i < 1000 && !tl.finished; i++) {
    tl.tick(16, 1, e);
    if (tl.ghosts(e).some((g) => g.taskId === dup.id)) seen = true;
  }
  assert.ok(seen);
  assert.equal(tl.ghosts(e).length, 0);
});

test("modo: prefers-reduced-motion sempre desliga; mobile/baixo desempenho reduz; preferência salva vence heurísticas", () => {
  const base = { prefersReducedMotion: false, saved: null, viewportWidth: 1440, hardwareConcurrency: 8, deviceMemory: 8 } as const;
  assert.equal(resolveMode(base), "full");
  assert.equal(resolveMode({ ...base, prefersReducedMotion: true, saved: "on" }), "off");
  assert.equal(resolveMode({ ...base, viewportWidth: 390 }), "reduced");
  assert.equal(resolveMode({ ...base, hardwareConcurrency: 2 }), "reduced");
  assert.equal(resolveMode({ ...base, saveData: true }), "reduced");
  assert.equal(resolveMode({ ...base, saved: "off" }), "off");
  assert.equal(resolveMode({ ...base, viewportWidth: 390, saved: "on" }), "full");
});

test("rolagem: velocidade acelera a construção com teto; cena passada é detectada", () => {
  assert.equal(speedForVelocity(0), 1);
  assert.ok(speedForVelocity(700) > 1 && speedForVelocity(700) < speedForVelocity(3000));
  assert.equal(speedForVelocity(1e6), speedForVelocity(-1e6));
  assert.ok(FLUSH_VELOCITY > 1400);
  assert.equal(isPassed(500, 1000), true);
  assert.equal(isPassed(990, 1000), false);
  assert.equal(isInView(1000, 1200, 0, 800), false);
  assert.equal(isInView(300, 500, 0, 800), true);
});

test("FrameBudget: rebaixa só com média alta sustentada e ignora saltos de aba", () => {
  const ok = new FrameBudget();
  for (let i = 0; i < 100; i++) ok.push(16);
  assert.equal(ok.overBudget, false);
  const slow = new FrameBudget();
  for (let i = 0; i < 120; i++) slow.push(90);
  assert.equal(slow.overBudget, true);
  const tab = new FrameBudget();
  for (let i = 0; i < 100; i++) tab.push(2000);
  assert.equal(tab.overBudget, false);
});

test("cursor ocioso esperando alvo fora da viewport sai de cena e a cena não fica 'trabalhando'", () => {
  const tasks = planChoreography(sample, presetFor("contact"));
  const tl = new SectionTimeline(tasks);
  const e = env((id) => id !== "link0");
  for (let i = 0; i < 400; i++) tl.tick(16, 1, e);
  assert.equal(tl.working, false);
  assert.ok(tl.frames(e).every((f) => !f.visible), "ninguém fica parado na tela");
});
