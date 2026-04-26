# hieulm-portfolio

Personal portfolio website of **Lương Minh Hiếu (MHieu128)** — built with Astro, React, and Tailwind CSS. Deployed as a static site via Docker and Coolify.

---

## ✨ Features

- **Astro Islands Architecture** — zero JS shipped for static sections, React hydrated only where needed
- **13-Theme Color System** — swatch picker persisted in `localStorage`, no flash of unstyled content (FOUC)
- **Glassmorphism UI** — layered glass-medium / glass-subtle utilities with backdrop blur
- **Typewriter Hero** — animated text powered by a lightweight React island
- **Skills, Experience, About, Contact** — all sections lazy-hydrate on scroll (`client:visible`)
- **Static Site Generation** — fully pre-rendered HTML, SEO-friendly, no client-side routing
- **Auto Sitemap** — `@astrojs/sitemap` generates `sitemap-0.xml` at build time
- **Contact Form** — toast notifications via Sonner
- **Docker + Coolify** — production-ready multi-stage Docker image behind Traefik

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) |
| UI Islands | [React 18](https://react.dev) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) |
| Components | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Outfit (display) + Inter (body) via Google Fonts |
| Build | Astro static output (`output: static`) |
| Production | Docker (nginx:alpine) + Coolify (Traefik) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** ≥ 9

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/MHieu128/MHieu128.github.io.git
cd MHieu128.github.io

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:4321)
npm run dev
```

### Production Build

```bash
# Build static files into dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## 🏗️ Project Structure

```
MHieu128.github.io/
├── public/                   # Static assets (images, CV, favicon)
│   ├── hieulm-avatar.jpg
│   ├── hieulm-description.jpg
│   └── Minh-Hieu-Luong-CV.pdf
├── src/
│   ├── components/           # Astro + React components
│   │   ├── HeroSection.astro       # Static hero shell
│   │   ├── HeroInteractive.tsx     # Typewriter + CTA buttons [client:load]
│   │   ├── Navigation.tsx          # Sticky nav + ThemeSwitcher [client:load]
│   │   ├── FloatingElements.tsx    # CSS-only drifting orbs [client:load]
│   │   ├── SkillsSection.tsx       # Skills grid [client:visible]
│   │   ├── ExperienceSection.tsx   # Timeline [client:visible]
│   │   ├── AboutSection.tsx        # About me [client:visible]
│   │   ├── ContactSection.tsx      # Contact form [client:visible]
│   │   ├── ThemeSwitcher.tsx       # 13-theme swatch picker
│   │   ├── AnimatedText.tsx        # TypewriterText + AnimatedCounter
│   │   ├── Footer.astro            # Static footer
│   │   └── ui/                     # shadcn/ui primitives
│   ├── hooks/                # Custom React hooks
│   │   ├── useTheme.ts             # localStorage theme management
│   │   ├── useScrollAnimation.ts   # Intersection Observer scroll reveals
│   │   └── use-toast.ts            # Toast state hook
│   ├── layouts/
│   │   └── Layout.astro      # Root layout: meta, OG tags, fonts, theme script
│   ├── lib/
│   │   └── utils.ts          # clsx + tailwind-merge helper
│   ├── pages/
│   │   ├── index.astro       # Home page — composes all sections
│   │   └── 404.astro         # Static 404 page
│   └── styles/
│       └── global.css        # CSS variables, theme selectors, glass utilities
├── Dockerfile                # Multi-stage: node:20-alpine → nginx:alpine
├── docker-compose.yml        # Coolify-ready (no port exposure, Traefik routes)
├── nginx.conf                # Static file serving + 404 + _astro/ cache headers
├── astro.config.mjs          # Astro config: react, tailwind, sitemap integrations
├── tailwind.config.ts        # Custom palette (gold), Outfit font, drift animations
└── tsconfig.json             # Extends astro/tsconfigs/strict, @/* alias
```

---

## 🎨 Theme System

The site ships with **13 color themes** selectable via the swatch picker in the navigation bar:

| Theme | Primary |
|---|---|
| `default` | Teal |
| `ocean` | Deep Blue |
| `forest` | Green |
| `rose` | Rose / Pink |
| `sunset` | Amber / Orange |
| `lavender` | Purple |
| `midnight` | Navy |
| `ember` | Red / Orange |
| `peach` | Warm Peach |
| `sage` | Sage Green |
| `sky` | Sky Blue |
| `sand` | Warm Sand / Tan |

Theme choice is stored in `localStorage` and applied as a CSS class on `<html>` via an inline script in `Layout.astro` — no FOUC.

---

## 🐳 Docker

### Build & Run Locally

```bash
# Build the Docker image
docker build -t hieu-portfolio .

# Run on port 3000
docker run --rm -p 3000:80 hieu-portfolio

# Visit http://localhost:3000
```

### docker-compose (for Coolify)

```bash
# No port mapping — Traefik handles external routing automatically
docker compose up -d
```

---

## ☁️ Deploy to Coolify

1. Push your changes to the Git repository
2. In Coolify: **New Resource → Docker Compose** (or **Dockerfile**)
3. Set your domain in Coolify's UI — Traefik labels are auto-generated
4. Enable **SSL/TLS** in the Coolify dashboard
5. Click **Deploy** — Coolify builds the Docker image and routes traffic to port 80

> The `docker-compose.yml` intentionally omits `ports:` — Coolify's Traefik reverse proxy handles all external routing.

---

## 📁 Required Assets

Make sure these files exist in `public/` before building:

| File | Purpose |
|---|---|
| `public/hieulm-avatar.jpg` | Avatar photo in the Hero section |
| `public/hieulm-description.jpg` | OG / description image |
| `public/Minh-Hieu-Luong-CV.pdf` | CV download linked from the Hero CTA |

---

## 📄 License

This project is personal and not licensed for redistribution. All content and design are © Lương Minh Hiếu.
