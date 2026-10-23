# Page Audit

Checked live at `http://127.0.0.1:8765/` on 20 Oct 2026.

# Portfolio Content Audit

| Content on the Page | True? | Evidence, or What I Removed |
|---|---|---|
| My name | Yes | The only `<h1>` is **Bhoomika Thakwani**. The page title and footer use the same name. |
| About section | Yes | `#about` is present. Copy is written in first person: 2nd-year B.Tech CSE at JECRC University, Jaipur. |
| Role line | Yes | Hero text: “Undergraduate Computer Science Engineering Student”. |
| Skills list | Yes | `#skills` is a `<ul>` with five items: Prompt engineering; Data Analysis with Python, SQL and Power BI; Data Structures and Algorithms; Operating System Handling; Database Management. |
| GitHub repository | No | Not on the page. There is no GitHub URL, link, or username. Did not add a generated profile. |
| Email address | No | Removed generated fake email. Footer still says `Contact: PLACEHOLDER email or social link` (not a real address). |
| Project titles | No | Five items are labeled **PLACEHOLDER** (Project One through Five). Not real project names. |
| Project URLs | No | Links go to `https://PLACEHOLDER-project-*.example.com`. They are not real repositories or sites. |
| Project descriptions | No | Each line is a **PLACEHOLDER** brief description. |
| Footer contact / social | No | Placeholder only. No `mailto:` and no social profile link. |

## What stayed because it is labeled, not claimed as real

Unknown details use the word **PLACEHOLDER** (11 matches in the live page text). They were left in place so they can be searched and replaced later. They are not presented as finished facts.

## Browser checks

| Check | Result |
|---|---|
| Document title | `Bhoomika Thakwani — Personal Profile` |
| Single main heading | One `<h1>` |
| Inline `style` attributes | None (0) |
| Nav → About | URL became `/#about` |
| Nav → Skills | URL became `/#skills` |
| Nav → Projects | URL became `/#projects` |
| Theme toggle | Button went from “Light mode” (`aria-pressed` true, dark theme) to “Dark mode” (light theme) |
| Footer year | `© 2026 · Bhoomika Thakwani` (set by `script.js`) |
| GitHub links | None |
| `mailto:` links | None |

## Verdict

True, first-person content on this page: **name, about, student role, and skills**.

Not true / not present: **GitHub, email, and all five projects**. Projects and contact are still marked PLACEHOLDER. No fabricated GitHub or email was left on the page.
