# Implementation Progress: Vite+React → Astro + Coolify

## Status: ✅ Build Passing

```
[build] 2 page(s) built in 2.38s
[build] Complete!
```

---

## What Was Done

### Phase 1 — Astro Scaffolding ✅
| File | Action | Notes |
|---|---|---|
| `astro.config.mjs` | Created | `output: static`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/sitemap` |
| `package.json` | Rewritten | Removed Vite, react-router, next-themes, react-query, ~25 unused Radix packages |
| `tsconfig.json` | Rewritten | Extends `astro/tsconfigs/strict`, keeps `@/*` alias |
| `tailwind.config.ts` | Updated | Added `gold` palette, `Outfit` font display, `drift` animations, updated content paths |
| `postcss.config.mjs` | Created | Replaced `.js` version |
| `src/styles/global.css` | Updated | Added gold CSS vars, 13 theme selectors, glass-medium/strong/subtle utilities, drift keyframes |

### Phase 2 — Astro Layout & Pages ✅
| File | Action | Notes |
|---|---|---|
| `src/layouts/Layout.astro` | Created | Replaces `index.html`: meta/OG tags, Outfit+Inter fonts, inline theme script (no FOUC), `<slot />` |
| `src/pages/index.astro` | Created | Composes all sections with `client:load` / `client:visible` directives |
| `src/pages/404.astro` | Created | Static 404 page |

### Phase 3 — Component Migration ✅

#### New Astro Components (zero JS shipped)
| Component | Notes |
|---|---|
| `src/components/HeroSection.astro` | Static shell with avatar image, floating tech icons (CSS-only), delegates interactive parts to `HeroInteractive` React island |
| `src/components/Footer.astro` | Static footer, uses Astro frontmatter `new Date().getFullYear()` |

#### New React Components
| Component | Notes |
|---|---|
| `src/components/HeroInteractive.tsx` | `client:load` — TypewriterText, CTA buttons (View Work / Download CV / Contact), social links |
| `src/components/ThemeSwitcher.tsx` | `client:load` — 13-theme color swatch grid, replaces old Sun/Moon toggle |
| `src/hooks/useTheme.ts` | Custom hook replacing `next-themes`, reads/writes `localStorage` + `document.classList` |

#### Updated Components (default exports + glass class upgrades)
| Component | Directive | Changes |
|---|---|---|
| `Navigation.tsx` | `client:load` | Replaced `next-themes` → `useTheme`, added `ThemeSwitcher`, RAF scroll, body overflow lock on mobile |
| `FloatingElements.tsx` | `client:load` | Replaced mouse-parallax with CSS-only drift animations (matches source) |
| `SkillsSection.tsx` | `client:visible` | Added `export default`, `glass` → `glass-medium/subtle` |
| `ExperienceSection.tsx` | `client:visible` | Added `export default`, `glass` → `glass-medium/subtle` |
| `AboutSection.tsx` | `client:visible` | Added `export default`, `glass` → `glass-medium/subtle` |
| `ContactSection.tsx` | `client:visible` | Added `export default`, `<Toaster />` moved inside (cross-island context fix) |

#### Unchanged (kept as-is)
- `src/components/AnimatedText.tsx` (TypewriterText + AnimatedCounter)
- `src/components/ui/GlassCard.tsx`
- `src/hooks/useScrollAnimation.ts`
- `src/hooks/use-toast.ts`
- `src/lib/utils.ts`
- All retained shadcn/ui components: `badge`, `button`, `input`, `textarea`, `label`, `toast`, `toaster`, `sonner`, `tooltip`

### Phase 4 — Deleted Files ✅
- `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/vite-env.d.ts`
- `src/pages/Index.tsx`, `src/pages/NotFound.tsx`
- `src/components/NavLink.tsx`
- `src/components/ui/` — ~35 unused shadcn components
- `index.html`, `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`
- `tsconfig.app.json`, `tsconfig.node.json`
- `postcss.config.js`, `src/index.css` (moved to `src/styles/global.css`)
- `bun.lockb` (regenerated as `package-lock.json`)

### Phase 5 — Docker & Coolify Deployment ✅

#### `Dockerfile`
- Multi-stage: `node:20-alpine` builder → `nginx:alpine` production
- `npm ci` (faster, deterministic) instead of `npm install --legacy-peer-deps`
- Copies `dist/` to nginx html root

#### `docker-compose.yml`
```yaml
# NO ports: mapping — Coolify's Traefik handles external routing
services:
  portfolio:
    build: .
    container_name: hieu-portfolio
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:80"]
```

#### `nginx.conf`
- Removed SPA fallback (`/index.html`) → `try_files $uri $uri/ $uri.html =404`
- Added `error_page 404 /404.html` for Astro's static 404
- Added `/_astro/` cache location (immutable, 1 year)
- Added `Referrer-Policy` security header

---

## Multi-Theme System (Bonus Enhancement)

Added a full 13-theme color system that was not in the original plan but was already present in the source repo:

| Theme | Primary Color |
|---|---|
| default | Teal |
| ocean | Deep Blue |
| forest | Green |
| rose | Rose/Pink |
| sunset | Amber/Orange |
| lavender | Purple |
| midnight | Deep Blue/Navy |
| ember | Red/Orange |
| peach | Warm Peach |
| sage | Sage Green |
| sky | Sky Blue |
| sand | Warm Sand/Tan |
| (2 more) | ... |

Theme is stored in `localStorage` and applied via CSS class on `<html>`. The `ThemeSwitcher` component renders a swatch grid.

---

## Architecture: Client Directives Map

```
index.astro (static shell)
├── Layout.astro (static, zero JS)
│   └── <slot /> — all page content
├── Navigation.tsx         [client:load]   ← immediately interactive
├── HeroSection.astro      [static]        ← zero JS
│   ├── FloatingElements   [client:load]   ← CSS-only drifting orbs
│   └── HeroInteractive    [client:load]   ← typewriter + CTA buttons
├── SkillsSection.tsx      [client:visible] ← lazy hydrate on scroll
├── ExperienceSection.tsx  [client:visible]
├── AboutSection.tsx       [client:visible]
├── ContactSection.tsx     [client:visible] ← includes own <Toaster />
└── Footer.astro           [static]         ← zero JS
```

---

## Build Output

```
dist/
├── index.html          ← full static HTML (SEO-friendly, no JS required to render)
├── 404.html
├── sitemap-index.xml
├── sitemap-0.xml
├── robots.txt
├── favicon.ico
├── hieulm-description.jpg
├── hieulm-avatar.jpg   ← new avatar image needed in public/
└── _astro/             ← hashed JS bundles (only loaded for interactive islands)
    ├── Navigation.*.js
    ├── HeroInteractive.*.js
    ├── SkillsSection.*.js
    ├── ExperienceSection.*.js
    ├── AboutSection.*.js
    ├── ContactSection.*.js
    └── index.*.js (React runtime, shared)
```

---

## Pending / Notes

### File needed in `public/`
- `public/hieulm-avatar.jpg` — avatar photo referenced by HeroSection.astro
- `public/Minh-Hieu-Luong-CV.pdf` — CV download referenced by HeroInteractive

### Coolify Deployment Steps
1. Push to your Git repo
2. In Coolify: **New Resource → Docker Compose** (or **Dockerfile**)
3. Set your domain in Coolify's UI (Traefik labels auto-generated)
4. Enable SSL/TLS in Coolify dashboard
5. Deploy → Coolify builds the Docker image and Traefik routes to port 80

### Verify Locally
```bash
# Dev server
npm run dev

# Production build check
npm run build
npm run preview

# Docker test (without Coolify)
docker build -t hieu-portfolio .
docker run --rm -p 3000:80 hieu-portfolio
# Visit http://localhost:3000
```
