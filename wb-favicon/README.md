# WB favicon pack

Built from the WB mark, re-drawn as clean vectors (straight edges are true lines, the B's
bowls and counter are exact concentric circles), so every size is rendered from geometry
rather than upscaled from the source PNG.

Brand colour: `#202A38` · Light surface: `#FFFFFF`

## Install (static site)

Drop every file into your web root — `public/` for Next.js / Vite / Astro, `static/` for
SvelteKit or Hugo, the project root for a plain HTML site — then paste `head-snippet.html`
into `<head>`.

```
public/
├── favicon.ico
├── favicon.svg
├── favicon-16x16.png            ⋯ -dark.png
├── favicon-32x32.png            ⋯ -dark.png
├── favicon-48x48.png            ⋯ -dark.png
├── favicon-96x96.png            ⋯ -dark.png
├── apple-touch-icon.png         ⋯ -dark.png
├── icon-192.png / icon-512.png  ⋯ -dark.png
├── icon-maskable-192.png / icon-maskable-512.png
├── mstile-150x150.png
├── safari-pinned-tab.svg
├── site.webmanifest
└── browserconfig.xml
```

Keep `head-snippet.html` and this README out of the deploy if you prefer — they're
documentation, not assets.

## Install (Next.js App Router)

The App Router generates the `<link>` tags for you from file names. Copy into `app/`:

| From | To |
| --- | --- |
| `favicon.ico` | `app/favicon.ico` |
| `favicon.svg` | `app/icon.svg` |
| `apple-touch-icon.png` | `app/apple-icon.png` |
| `site.webmanifest` | `app/manifest.webmanifest` |

Put the remaining PNGs in `public/` and reference them from the manifest. If you go this
route you don't need `head-snippet.html`, except for the two `theme-color` meta tags —
set those via the `viewport` export instead:

```ts
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)',  color: '#202A38' },
  ],
}
```

## How dark / light works

- **`favicon.svg`** carries a `prefers-color-scheme` media query internally — one file,
  navy mark on light systems, white mark on dark ones. This is what modern Chrome,
  Edge, Firefox and Safari will actually use.
- **`*-dark.png`** files are the white-mark variants, served through `media` attributes on
  the `<link>` tags as a fallback. Support is decent but not universal; harmless where
  it's ignored, since the light PNG is also listed.
- **`favicon.ico`** can't adapt — Windows and older browsers read one bitmap. It's drawn
  as a navy tile with a white mark so it stays readable on both light and dark tab strips.
  If you'd rather it be a bare navy mark on transparent, regenerate from `logo-dark.svg`.

## File notes

- `logo.svg` uses `fill="currentColor"` — use it inline in the UI and it inherits text colour.
- `logo-dark.svg` (navy mark) / `logo-light.svg` (white mark) are the fixed-colour wordmarks
  for email signatures, PDFs, and anywhere CSS can't reach.
- `apple-touch-icon.png` is deliberately a plain square with no rounded corners — iOS
  applies its own mask, and pre-rounding it produces a double-rounded edge.
- `icon-maskable-*.png` keep the mark inside the 80% safe zone, so Android can crop to a
  circle, squircle or teardrop without clipping letters.
- The mark is wide (2.84:1), so at 16px it's about 15 × 5px. It's given extra width at
  16/32px to claw back legibility, and `favicon.ico` uses the filled tile for the same reason.

## Before you commit

`site.webmanifest` is filled in with `"West Berg"` and root-relative paths (`/icon-192.png`).
Change the name, and prefix the paths, if the site is served from a subdirectory.

Then just:

```bash
git add public
git commit -m "Add WB favicon pack (light + dark)"
```
