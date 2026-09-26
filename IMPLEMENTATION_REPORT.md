# Portfolio redesign — implementation and validation

Status: implemented locally against main commit 6318ebbf6b37111b6edb2c54986a6ef549000e8c. Not pushed, deployed or visually approved.

## Changes
- Replaced dense typographic hierarchy, repeated text ledgers and amber accents with Geist / Instrument Serif, a warm white/cobalt palette, fluid type and larger spacing. Existing dark-mode preference remains supported.
- New hero: “Clear thinking. Useful things.” Existing name, positioning and owner editing remain data-driven. Work and About are immediately accessible.
- Added one scroll-reactive SVG Living Signal with five conceptual states plus neutral, deterministic geometry, pausing, reduced-motion behavior and lighter mobile rendering. Its continuity spans the hero/capability narrative, not every page of the site.
- Selected Work now has large data-derived architecture visuals and concise summaries, while existing full detail routes retain their content.
- Academic Pedigree appears on the homepage and uses the shared education source. Corrected the old generic undergraduate institution to Rajiv Gandhi Institute of Petroleum Technology (RGIPT), preserving B.Tech / Chemical Engineering and IIM Shillong MBA. Existing cached education receives a narrow correction only when it still matches the old institution. About, résumé and quick profile use that source. Updated Person alumniOf institution.
- Applied typography/color tokens across pages and shortened Work, Tools, About and contact copy. Preserved tool scoring and calculations.
- Found pre-existing authentication wiring absent from App. Connected existing AuthProvider and ProtectedRoute, added login route, restricted edit controls and DataContext mutators to owner, protected /studio and /admin, and separately loaded Studio/editor bundles. Existing server auth logic is unchanged.
- Fixed an existing npm dependency-resolution conflict: Vite 8 requires optional esbuild 0.27/0.28; the repository declared 0.25. Updated to 0.28 and added npm lockfile. Vite/Vercel configuration and environment variable names remain unchanged.

## Verified
- `npm run build` passes.
- `npm run lint` (TypeScript) passes.
- `tests/redesign-smoke.tsx`: 19 routes render; public edit controls hidden with a stale local edit flag; shared education present on four pages; missing/empty/invalid authorization receives 401 with auth unconfigured.
- No modifications to positioning diagnostic or other calculator source files.
- Studio and EditorModal are separate build chunks (approximately 4.55KB and 5.97KB gzip). Main app chunk is approximately 62.9KB gzip, plus existing React/vendor bundles and CSS.

## Remaining verification / limitations
- Browser visual QA, all requested viewport widths, interaction regression, live owner login, Lighthouse, LCP/CLS/INP and mobile frame-rate testing remain unverified. The browser rejected localhost access, and GitHub blocked creating the review branch with HTTP 403 “Resource not accessible by integration,” preventing a Vercel preview.
- No portrait/event image assets or photography data exist in this repository. No fake photography was added. The photographic gallery part of the brief requires real supplied assets.
- Existing editor persistence is localStorage; the existing server endpoint authorizes requests but does not persist content. This redesign does not implement a CMS backend or claim that edits publish globally.
- No production deployment has occurred. Grant the GitHub integration repository Contents write access under Portfolio-of-Manash-Protim-Deori to continue with a branch/preview and visual refinement.

## Apply
The archive includes updated source files and `portfolio-redesign.patch`. In a clean checkout of the base commit, run `git apply --check portfolio-redesign.patch`, then `git apply portfolio-redesign.patch`, `npm ci`, `npm run build` and `npm run lint`. Review a Vercel preview before merging into production. Do not apply both the patch and replacement source files.

Smoke test: `node_modules/.bin/esbuild tests/redesign-smoke.tsx --bundle --platform=node --format=esm --packages=external --define:import.meta.env='{}' --outfile=tests/.smoke.mjs` then `node tests/.smoke.mjs`.

## Files changed
- `.gitignore`
- `DESIGN_SYSTEM.md`
- `IMPLEMENTATION_REPORT.md`
- `LIVING_SIGNAL.md`
- `index.html`
- `package-lock.json`
- `package.json`
- `src/App.tsx`
- `src/components/home/AcademicJourney.tsx`
- `src/components/home/ClosingCta.tsx`
- `src/components/home/FeaturedWork.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/ProofOfWork.tsx`
- `src/components/layout/Header.tsx`
- `src/components/visualizations/LivingSignal.tsx`
- `src/config/site.config.ts`
- `src/context/DataContext.tsx`
- `src/context/ThemeContext.tsx`
- `src/data/defaults.ts`
- `src/data/experience.ts`
- `src/index.css`
- `src/pages/AboutPage.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/LabPage.tsx`
- `src/pages/ToolsPage.tsx`
- `src/pages/WorkPage.tsx`
- `tests/redesign-smoke.tsx`
