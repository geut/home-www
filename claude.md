# GEUT Studio - New Homepage

## Project Overview

This is the new homepage for GEUT (geutstudio.com), a boutique JavaScript consultancy studio specializing in high-quality web software development. GEUT focuses on decentralized technologies (particularly P2P applications), full-stack development, and open-source contributions.

**Old site:** https://geutstudio.com
**Team:** Diego Paez, Esteban Primost, Martin Acosta
**Location:** Argentina
**Contact:** contact@geutstudio.com

## Tech Stack

- **Framework:** Astro 5.7+ with React integration
- **Styling:** Tailwind CSS 4.1+ with DaisyUI and custom plugins
- **Animations:** Framer Motion 12+
- **Fonts:** Inter and IBM Plex Mono (via Google Fonts)
- **Deployment:** Cloudflare Pages
- **Code Quality:** Biome (linting/formatting), ESLint (Astro)
- **Git Hooks:** Lefthook

## Project Structure

```
src/
├── pages/           # Astro pages (routes)
│   ├── index.astro       # Homepage
│   ├── our-work.astro    # Work/portfolio page
│   ├── team.astro        # Team page
│   └── contact.astro     # Contact page
├── components/      # React and Astro components
│   ├── sections/         # Page section components
│   │   ├── Hero.astro
│   │   ├── Work.astro
│   │   ├── Team.astro
│   │   └── Talk.astro
│   └── icons/           # Icon components
├── layouts/         # Layout templates
│   └── Layout.astro
├── data.ts          # Site configuration and content
└── lib/             # Utility functions
```

## Key Files

- [data.ts](src/data.ts) - Central configuration for site content (motto, blurb, navigation links, colors)
- [astro.config.mjs](astro.config.mjs) - Astro configuration with React, Tailwind, and Cloudflare adapter
- [package.json](package.json) - Dependencies and scripts

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
```

## Brand Identity

**Motto:** "Simple. Smart. Opinionated"

**Blurb:** "We craft high-quality software for the web using JavaScript and Node.js. From niche P2P to fast-moving startups — the web is our playground."

**Core Values:**
- Software craftsmanship with opinions
- Beautiful design and clean code
- Open-source contribution
- Decentralized technology expertise
- Creating software that matters

**Color Palette:**
- Blue: #4ACFD9 (300), #287BCE (500), #1E2A60 (700), #121a3c (900)
- Green: #3DBE78 (300), #2D8C5E (500), #1c5b3c (700)

## Notable GEUT Projects

- **SHER** - Decentralized live audio platform for creators
- **Permanent Seeder** - P2P network infrastructure
- Open source: discovery-swarm-webrtc, hyper-hooks, swarm-hooks, chan

## Coding Conventions

- Use Astro components for static content and page structure
- Use React components for interactive UI elements
- Keep site content centralized in [data.ts](src/data.ts)
- Follow Biome formatting rules
- Component file naming: PascalCase for React, kebab-case for assets
- Use Tailwind utility classes for styling
- Leverage Framer Motion for animations

## Page Sections

1. **Hero** - Landing section with motto and blurb
2. **Work** - Portfolio/case studies
3. **Team** - Team member profiles
4. **Talk/Contact** - Contact form and Cal.com integration

## Notes for AI Assistants

- This is a fresh redesign of the existing GEUT website
- Maintain the boutique, opinionated, and craft-focused brand identity
- Emphasize JavaScript/Node.js expertise and P2P/decentralized technology
- Keep design modern and minimalist
- The studio values quality over quantity and clear technical direction
- Team has deep experience in open-source and community building
