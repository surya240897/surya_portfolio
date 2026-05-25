# Surya Bhan Portfolio — Project Context

Single-page React portfolio for Surya Bhan Pratap Singh (AI Product Manager). Designed to be deployable but currently runs as a zero-build local preview because Node isn't installed on this machine.

## How it runs (no Node toolchain)

```
python3 -m http.server 5173
```

Visit **http://localhost:5173**. The `index.html` loads React 18 UMD + Tailwind v3 (CDN) + Babel standalone, then `app.tsx` is served as a Babel-transformed script with `data-presets="typescript,react"`. First load is slow (~2s spinner) because Babel transpiles the 1500+ line TSX in the browser — subsequent loads are cached.

**Always share `http://localhost:5173` at the end of any reply that touches code**, plus a Cmd+Shift+R hard-refresh reminder (in-browser Babel caches aggressively).

## File structure

```
portfolio/
├── index.html                    # Loads CDN scripts + app.tsx via Babel
├── app.tsx                       # LIVE preview — has no `import React`, calls ReactDOM.createRoot at bottom
├── surya_bhan_portfolio.tsx      # CANONICAL source — has imports + export default (for eventual Vite build)
├── CLAUDE.md                     # This file
├── Surya_Bhan_PM_Resume.docx     # Resume source (still .docx — needs PDF export before deploy)
├── Professional_Journey.docx     # Detailed writeups behind every metric — the source of truth for case studies
├── rezo.png                      # Company logo — Rezo.ai
├── belzabar.png                  # Company logo — Belzabar
├── authbridge.avif               # Company logo — AuthBridge (AVIF format, .avif extension matters)
├── iitj.png                      # Education logo — IIT Jodhpur
├── vit.png                       # Education logo — VIT Vellore
├── cspo.png                      # Certification — CSPO 2025
└── pmp.png                       # Certification — PMP 2023
```

## CRITICAL: two-file sync

Every code edit needs to happen in BOTH `app.tsx` (live preview) and `surya_bhan_portfolio.tsx` (canonical). They diverge in exactly three places:
1. `surya_bhan_portfolio.tsx` has `import React, { useState, useEffect, useRef } from "react";` at the top — `app.tsx` has `const { useState, useEffect, useRef } = React;` instead.
2. `surya_bhan_portfolio.tsx` has `export default function App()` — `app.tsx` has `function App()`.
3. `app.tsx` ends with `ReactDOM.createRoot(document.getElementById("root")).render(<App />);` — canonical file does not.

Everything else (data, components, styling) must stay identical. The canonical file is what gets deployed.

## Architecture

### Theme system
Two themes, manual toggle in the nav, persisted in `localStorage`. Helper:

```ts
const tc = (key: keyof typeof T, theme: Theme) => T[key][theme];
// usage: className={`${tc("bg", theme)} ${tc("text", theme)}`}
```

The `T` object maps semantic keys (`bg`, `text`, `textMuted`, `border`, `card`, etc.) to `{dark, light}` Tailwind class strings. NEVER write `theme === "dark" ? "..." : "..."` ternaries in JSX — always go through `tc()`. Keeps theme changes confined to one object.

### Animation system (the reveal-on-scroll)
Single source of truth at the top of the file:

```ts
const REVEAL_BASE   = "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";
const REVEAL_HIDDEN = "opacity-0 translate-y-12 scale-[0.96] blur-[3px]";
const REVEAL_SHOWN  = "opacity-100 translate-y-0 scale-100 blur-0";
```

Every animated card uses: `${REVEAL_BASE} ${inView ? REVEAL_SHOWN : REVEAL_HIDDEN}` plus a `transitionDelay: ${idx * 160}ms` inline style for stagger.

`useInView` defaults to `threshold: 0, rootMargin: "0px 0px -120px 0px"` — meaning the reveal fires when the card's top edge is 120px past the viewport bottom, so the user comfortably sees the animation play out.

Tuning: change the three constants, not individual call sites.

### Rules of Hooks
The `useInView` hook is per-card, so every card type has its own subcomponent (`WorkCard`, `SkillCard`, `EducationCard`, `CaseStudyCard`). Do NOT call `useInView` inside a `.map()` — extract a subcomponent and pass props.

### Data model
Two top-level arrays drive the home page AND the deep-dive overlay:

- **`workExperience[]`** — drives the Work timeline section (Before/After cards). Each item also has `challenge`, `insight`, `transformation`, and `bento[]` for the deep-dive overlay. AuthBridge has 8 bento cards (reflecting 13 projects), Rezo and Belzabar have 4 each.
- **`caseStudies[]`** — drives the Case Studies section. Same kind of deep-dive content but nested under `sections: { challenge, insight, transformation, bento }`.

The deep-dive `CaseStudyView` accepts EITHER array's ID and normalizes both shapes into a single `cs` object before rendering. If you add a new field to one shape, update the normalization in `CaseStudyView`.

### Logo system
`LogoImg` renders any image inside a white-backed rounded square with subtle ring + shadow. Works for all 3 logo categories (company / education / certification) regardless of the underlying image's transparency or color.

Cache busting: every logo URL gets a `?v=${LOGO_VERSION}` query string. Bump `LOGO_VERSION` when swapping a file's content so browsers re-fetch. Currently at `"5"`.

The `BrandLogos` object exports logo components keyed by slug — every consumer (work cards, case-study deep page, education cards, cert list) calls these as React components, never the raw paths.

### Navigation
Sticky glassmorphic header with active-section underline. `useActiveSection` tracks which section is currently in the viewport by comparing scroll position to each section's top. Sections IDs: `work`, `skills`, `education`, `case-studies`.

### Modal (Say Hello)
`ContactModal` — escape key closes, click-outside closes, body scroll locks while open, copy-email-to-clipboard with confirmation animation. Triggered from nav, hero, and footer.

## Resume download
Both the hero and modal have `<a href="/Surya_Bhan_PM_Resume.pdf" download>` buttons. The user's resume is still in `.docx`. Before they deploy: either export the docx to PDF and put it at the project root as `Surya_Bhan_PM_Resume.pdf`, or change `RESUME_FILE` at the top of both .tsx files to point at the actual filename.

## What NOT to do

- Don't run `npm`, `vite`, or any Node toolchain command — Node isn't installed and the user explicitly asked for a zero-install setup.
- Don't try to view PNG/JPG image content via the Read tool — the user's environment rejects image previews. Identify images by filename + size + the user's verbal confirmation only.
- Don't add new theme branches with ternaries — extend the `T` object instead.
- Don't call `useInView` inside `.map()` — extract a subcomponent.
- Don't write to `app.tsx` without mirroring to `surya_bhan_portfolio.tsx` (and vice versa).
- Don't suggest installing Homebrew or Node unless the user asks how to deploy.

## Eventual deployment path

When the user is ready to deploy:
1. Install Node (Homebrew → `brew install node`).
2. Scaffold a Vite + React-TS project, drop `surya_bhan_portfolio.tsx` in as `src/App.tsx`, install Tailwind v3.
3. Move the 7 image files + the PDF resume into `/public`.
4. `npm run build` → push the `dist/` to Vercel or Netlify. Both auto-detect Vite.

The CDN/Babel preview is for iteration only — not production-grade.

## Content conventions

The professional content in the case studies is pulled from `Professional_Journey.docx` — that doc is the source of truth. The resume hits the highlights; the journey doc has the discovery, decisions, tradeoffs, and outcomes behind each metric. When the user asks to "add more detail" to a case study, that doc is where to look first.

Numbers in the portfolio (₹4Cr+ savings, ₹2.5Cr/mo disbursements, 54% TAT, etc.) come directly from the resume — keep them consistent.
