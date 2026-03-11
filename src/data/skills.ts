export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  key: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React Native", icon: "react" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Python", icon: "python" },
      { name: "REST APIs", icon: "api" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    key: "database",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "Firebase RTDB", icon: "firebase" },
    ],
  },
  {
    key: "tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Arduino/IoT", icon: "arduino" },
      { name: "Postman", icon: "postman" },
      { name: "Expo", icon: "expo" },
      { name: "Android Studio", icon: "android" },
      { name: "Linux", icon: "linux" },
    ],
  },
];
