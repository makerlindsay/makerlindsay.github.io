# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
hugo server          # Start dev server with live reload
hugo                 # Build the site
hugo --minify        # Production build (used in CI)
npm install          # Install PostCSS/Prettier dependencies
prettier --write .   # Format files (supports Go templates via plugin)
```

## Architecture

Hugo static site for `lindsaybalfour.com`. Content lives in `/content/` as Markdown with YAML front matter; templates in `/layouts/`; SCSS in `/assets/scss/`.

**Template composition:**
- `layouts/_default/baseof.html` — base HTML wrapper for all pages; compiles `assets/scss/main.scss` via Hugo Pipes (`css.Sass` → `fingerprint`)
- `layouts/index.html` — home page; inlines `assets/scss/brand.scss` directly in `<style>` tags (not via baseof)
- `layouts/_default/single.html` / `list.html` — generic page templates
- Custom layouts per section: `_default/about.html`, `_default/work.html`, `layouts/art/`

**Two distinct design systems:**
- `assets/scss/main.scss` — CSS custom properties design system used by all non-home pages (cards, grid, typography, navigation)
- `assets/scss/brand.scss` — premium marketing styles used only by the home page; inlined directly in `layouts/index.html`
- `assets/scss/resume.scss` — resume-specific styles

**Content collections** (`/content/art/`, `/content/event/`, `/content/project/`): pages use front matter cover images matched via `{cover.*,*.jpg,*.png}` resource patterns.

**Asset pipeline:** Hugo Pipes compiles SCSS, fingerprints assets for cache busting. Static files in `/static/` are copied as-is. PostCSS/autoprefixer runs via `postcss.config.js`.

**Deployment:** GitHub Actions (`.github/workflows/hugo.yml`) deploys to GitHub Pages on pushes to `main`. Hugo version pinned to `0.124.1`. GitLab CI (`.gitlab-ci.yml`) provides a secondary deployment to GitLab Pages.

## Design Tokens

**Fonts:** Cormorant Garamond (display/headings), Jost (body) — loaded from Google Fonts in `baseof.html`.

**Brand color palette** (defined in `brand.scss`, used on home page):
- Backgrounds: `bone`, `warm-taupe`, `dusty-plum`
- Accents: `maroon`, `rose-gold`, `midnight-plum`
- Text: `charcoal-espresso`

**Legacy palette** (defined in `main.scss` as CSS custom properties on `:root`): uses `--rgb-*` pattern for color with opacity support.
