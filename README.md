# MHieu128.github.io — Portfolio

A fast, responsive personal portfolio for Luong Minh Hieu built with plain HTML, CSS, and JavaScript and deployed with GitHub Pages.

Live site: https://mhieu128.github.io

## Features
- Clean, modern design with dark/light theme toggle
- Animated hero glow, card hover effects, and scroll‑reveal animations
- Sections: About, Skills, Experience, Projects, Education, Resume, Contact
- Resume provided as a download (not embedded) for privacy and performance
- Accessible defaults (skip link, focus styles), mobile‑friendly layout

## Repo structure
- `index.html` — Main page content and section layout
- `assets/css/styles.css` — Theme variables, layout, animations, and components
- `assets/js/main.js` — Mobile nav, theme toggle (with localStorage), scroll‑reveal
- `CV_Luong Minh Hieu.pdf` — Resume (linked as a downloadable PDF)
- `CV_extracted.md` — Extracted text used to fill the site content

## Customize
- Name/title: edit header and hero content in `index.html`.
- About summary: update the paragraph in the About section in `index.html`.
- Skills: edit the list in the Skills section in `index.html`.
- Experience & Projects: replace bullets and descriptions in `index.html`.
- Education: update your degree and university in `index.html`.
- Contact: set your real email and LinkedIn in `index.html`.
- Resume: replace `CV_Luong Minh Hieu.pdf` at repo root and the link in `index.html` (uses URL‑encoded path: `CV_Luong%20Minh%20Hieu.pdf`).
- Theme defaults/colors: tweak CSS variables in `assets/css/styles.css` (both default and `.light` sets).

## Local preview
You can open `index.html` directly in a browser, or run a simple static server.

PowerShell quick server (optional):

```powershell
# From the repo root
python -m http.server 5500
# Then open http://localhost:5500 in your browser
```

## Deploy
This is a user/organization GitHub Pages repo. Deployment happens automatically when you push to the default branch.

- Repo name: `MHieu128.github.io`
- Branch: `main`
- Site URL: https://mhieu128.github.io

For a custom domain, add a DNS CNAME record to `mhieu128.github.io` and a `CNAME` file in the repo root.

## Troubleshooting
- PDF doesn’t open: ensure the file exists at repo root and the link uses the exact filename (case‑sensitive on some hosts). The HTML uses a URL‑encoded path: `CV_Luong%20Minh%20Hieu.pdf`.
- Styles look off in light mode: adjust `.light` variables in `assets/css/styles.css`.
- Animations too strong: reduce shadows or disable animations by removing the related keyframes/selectors.

## License
All rights reserved by the author. Content in this repository is intended for personal portfolio use.
