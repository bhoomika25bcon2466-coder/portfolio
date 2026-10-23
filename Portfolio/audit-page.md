# Profile page audit

Review of the personal profile at `index.html`, styled by `style.css`, with behavior in `script.js`.

## Requirements checklist

| Requirement | Status | Notes |
| --- | --- | --- |
| HTML in `index.html` | Met | Single-page document with semantic `header`, `nav`, `main`, `section`, and `footer`. |
| All styling in `style.css` | Met | Linked with `<link rel="stylesheet" href="style.css">`. No `style` attributes in HTML. |
| No inline style attributes | Met | Workspace search for `style=` returned no matches. |
| Page title | Met | `<title>Bhoomika Thakwani — Personal Profile</title>` |
| One main heading | Met | A single `<h1>`: “Bhoomika Thakwani”. Section titles use `<h2>`. |
| About section | Met | `#about` with two paragraphs of known personal details. |
| Skills section as a list | Met | `#skills` uses `<ul class="skills-list">` with five items. |
| Projects section with links | Met | `#projects` lists five linked projects. Titles, URLs, and descriptions are marked PLACEHOLDER. |
| Placeholder text marked PLACEHOLDER | Met | Unknown details use the word PLACEHOLDER. Known name, about, and skills are filled in. |
| `script.js` | Met | Linked at the end of `body`. Handles year, theme, and active nav. |
| This audit file | Met | `audit-page.md` |

## Files

- `index.html` — structure and content
- `style.css` — layout, color, typography, dark theme, reduced-motion
- `script.js` — footer year, theme toggle with `localStorage`, section-aware nav highlighting
- `audit-page.md` — this review

## PLACEHOLDER index

Search the project for `PLACEHOLDER` to replace these later:

1. Project one title, URL (`https://PLACEHOLDER-project-one.example.com`), and description
2. Project two title, URL, and description
3. Project three title, URL, and description
4. Project four title, URL, and description
5. Project five title, URL, and description
6. Footer contact: `PLACEHOLDER email or social link`

Known content (not placeholders): name, page title, about copy, skills list, and copyright name.

## Structure and accessibility

**Strengths**

- Language is set with `lang="en"`.
- Viewport meta tag is present.
- Skip link targets `#main`.
- Primary navigation has `aria-label="Primary"`.
- Theme control is a `button` with `aria-pressed`.
- Headings follow a single `h1` then `h2` sections.
- Focus styles exist for links, the CTA, and the theme button.
- `prefers-reduced-motion` disables entrance animation and smooth scrolling.

**Gaps**

- Project links currently point at example hosts and will fail until replaced.
- Skills list uses custom markers (`list-style: none` plus a CSS `::before` square). Screen readers still receive a list, but the visual marker is decorative only.
- There is no `rel="noopener"` concern yet because placeholders are same-tab navigations; when real external URLs are added, consider `rel="noopener noreferrer"` and `target="_blank"` only if you want new tabs.
- Contact is plain text, not a `mailto:` or profile link, until the placeholder is replaced.
- Google Fonts load from a third-party CDN; the page still has system font fallbacks.

## JavaScript review

`script.js` is wrapped in an IIFE and does three things:

1. Sets `#year` to the current calendar year.
2. Applies light/dark theme from `localStorage` or `prefers-color-scheme`, and toggles it on button click.
3. Uses `IntersectionObserver` (when available) to add `is-active` on the matching nav link.

No console errors were observed during browser checks. Theme persisted across reload (button showed “Dark mode” after a prior light-theme save).

## Visual and layout notes

- Hero is full viewport height, left-aligned, with a teal CTA.
- Main column is capped at `42rem`, so wide screens show generous side space. That is intentional, not a missing layout.
- Entrance animation starts at `opacity: 0`. A screenshot taken immediately on load can look empty until the 0.9s fade finishes. This is expected; `prefers-reduced-motion` skips it.
- Dark theme tokens invert ink/foam/sea colors; CTA text is forced dark in dark mode for contrast.

## Browser verification

Checked locally at `http://127.0.0.1:8765/`:

- Document title, one `h1`, About, Skills list, and Projects links all present.
- “About me” scrolled to `#about`.
- Nav “Skills” went to `#skills`.
- Nav “Projects” went to `#projects`.
- Theme button switched label from “Dark mode” to “Light mode” (`aria-pressed` true) and back.
- Footer showed `© 2026 · Bhoomika Thakwani`.
- No inline styles.

Not fully verified: keyboard-only tab order through the skip link, and a real mobile device (CSS includes a `max-width: 600px` tweak). Project URLs were not opened because they are placeholders.

## Issues to fix when you personalize the page

1. Replace every PLACEHOLDER project name, URL, and description with real work.
2. Replace the footer contact placeholder with an email or LinkedIn/GitHub URL.
3. After adding real external project links, test that they open and that contrast still holds in both themes.
4. Optional: add `rel="noopener noreferrer"` if projects open in a new tab.

## Verdict

The page meets the requested HTML/CSS/JS split and content structure. Styling is external only. Unknown details are clearly marked PLACEHOLDER. JavaScript is present and working for year, theme, and section highlighting. Remaining work is content replacement, not scaffolding.
