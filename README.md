# Victor Theodoro — Developer Portfolio

Personal portfolio of Victor Theodoro, presenting software projects, technical experience, and ways to get in touch. Built as a bilingual (Portuguese/English) Next.js application.

**Live portfolio:** https://vftheodoro.vercel.app/pt  
**English version:** https://vftheodoro.vercel.app/en  
**LinkedIn:** https://www.linkedin.com/in/vftheodoro/

## Features

- Localized content for Portuguese and English using `next-intl`.
- Sections for projects, experience, achievements, teaching, skills, and contact.
- Responsive React components and UI animation with Framer Motion.
- Contact experience using EmailJS in the frontend.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, `next-intl`, Framer Motion, and EmailJS.

## Run locally

```bash
git clone https://github.com/vftheodoro/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open http://localhost:3000. Routes are localized under `/pt` and `/en`. Features requiring a configured external provider may need additional environment settings.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development |
| `npm run build` | Create a production build |
| `npm run start` | Serve a production build |
| `npm run lint` | Run ESLint |

## Project structure

- `src/app/[locale]`: localized pages and layouts.
- `src/components/sections`: portfolio sections.
- `src/data`: project, achievement, service, and press data.
- `messages/pt.json`, `messages/en.json`: translation content.
- `src/i18n`: internationalization configuration.
- `public`: local media assets.

## Maintenance

Edit portfolio entries in `src/data` and translations in `messages`. Review both languages when changing shared content. Verify external links and contact configuration before publishing.

## Notes

This is a personal portfolio, not a reusable SaaS template. Project descriptions should distinguish implemented features from prototypes and planned work. No credentials should be committed to the repository.
