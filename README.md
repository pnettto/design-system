# Pedro Netto's Design System

My attempt to reuse some design modules and make it easier to prototype stuff - my way :)

It powers [pnetto.com](https://pnetto.com). Open `dist/index.html` for the component showcase and `dist/gallery.html` for the photo gallery.

## v2 (dark only)

v2 follows the pnetto.com redesign: a gold accent on charcoal, one monospace typeface, hairline rules and quiet surfaces.

**Breaking changes from v1**

- Dark only: the light theme, the theme toggle component (`toggle.css`) and the theme-switching JS are gone. `data-theme` is no longer read.
- Links are gold by default; headings are bold monospace.
- `.container` is now wide (`--container-w: 1440px`) with a fluid `--gutter`. `.container.narrow` keeps the wide header and centres `main` at `--container-narrow`.
- The site header is a grid: logo on the left, navigation on the right.

v1 variable names (`--bg-color`, `--accent-color`, `--space-md`…) still work as aliases.

### Tokens (`src/css/tokens.css`)

| Token | Use |
|---|---|
| `--paper` | page background |
| `--surface`, `--surface-2` | bands and cards, card hover |
| `--deep` | footer and dark bands |
| `--ink`, `--ink-2`, `--ink-muted` | body, secondary and muted text |
| `--rule`, `--rule-soft` | hairlines |
| `--gold`, `--gold-soft` | the accent |
| `--fs-xs` … `--fs-2xl` | type scale (the two largest are fluid) |
| `--sp-xs` … `--sp-5xl` | spacing scale |
| `--gutter` | fluid page gutter |

### Components

- **Layout** (`layout.css`): `.eyebrow` (small gold caps label), `.link-strong` (underlined call to action), `.pill`, `.band` / `.band-dark` (full-bleed strip), `.page-header`, `.section-head` + `.section-title`, `.page-split` + `.split-aside` (sticky intro left, content right), `.visually-hidden`.
- **Footer** (`footer.css`): `.site-footer` > `.footer-inner` with `.footer-hello` (title, line, `.footer-mail`, `.footer-social`) and `.footer-columns`.
- **Nav** (`nav.css`): `.site-header`, `.logo` + `.logo-name`, `.header-nav`, `.main-nav`, `.burger-menu` (full-screen overlay on mobile).
- Also: badges and `.sticky-tags`, project cards and `.see-more-container`, post list and `.post-content`, timeline, code blocks and the code runner, carousel, gallery, lightbox, video (Plyr).

## Develop

```sh
npm install
npm run dev     # watch + browser-sync on dist/
npm run build   # bundle to dist/
npm run bump "Description"   # commit, patch version, push with tag
```

For a major or minor release, use `npm version major|minor` instead of `bump`, then push `main` and the tag.
