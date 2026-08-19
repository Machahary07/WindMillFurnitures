# Windmill — Font Styles Reference

**The home page (`home/`) is the main reference.** Any new page must follow these
specs. When a conflict arises, `home/styles.css` wins.

---

## 1. Font Families

Three families, loaded from Google Fonts. Never substitute Inter, Roboto, Arial,
or system fonts.

| Family | Role | Weights loaded |
|---|---|---|
| **Open Sans** | Base body font, nav links, utility links (footer, forgot-password) | 400, 500, 600, 700, 800 |
| **Plus Jakarta Sans** | Logo, headings, labels, buttons, body copy, form text | 500, 600, 700 |
| **Outfit** | Display words only (hero carousel words, "SOON") | 700 |

Standard `<head>` link (covers all pages — trim unused weights per page if you want):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&family=Outfit:wght@700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
```

**Rule:** a weight must be in the Google Fonts URL before CSS uses it, otherwise
the browser fakes it (faux-bold) and it looks off.

Fallback stacks, always in this order:

- `"Open Sans", "Helvetica Neue", Arial, sans-serif`
- `"Plus Jakarta Sans", "Open Sans", sans-serif`
- `"Outfit", "Open Sans", sans-serif`

---

## 2. Color Tokens (from `home/styles.css`)

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#111111` | Primary text |
| `--gray-nav` | `#8f8f8f` | Inactive nav links, muted link text, subtitles |
| `--gray-body` | `#4b4b4b` | Paragraph body copy |
| `--red` | `#bf3529` | Active-nav underline, accent underlines |
| (logo gray) | `#484848` | The Windmill logo, all pages |
| (search gray) | `#5e5e5e` | Search label |
| (hero black) | `#000000` | Display words over images |
| (placeholder) | `#b9b9b9` | Input placeholders |
| (footer gray) | `#b5b5b5` | Login footer links |

---

## 3. The Logo — identical on every page

```css
font-family: "Plus Jakarta Sans", "Open Sans", sans-serif;
font-size: 26px;
font-weight: 700;      /* Bold */
letter-spacing: 0;
color: #484848;
```

Applies to: `home` navbar logo, `log/log-in` brand, `building` brand, and any
future page. Do not restyle per page.

---

## 4. Home Page (`home/`) — the reference

Base body: Open Sans, `--ink`, antialiased.

| Element | Family | Weight | Size | Tracking | Color |
|---|---|---|---|---|---|
| Logo | Jakarta | 700 | 26px | 0 | `#484848` |
| Nav link (inactive) | Open Sans | 500 | 15px | — | `#8f8f8f` |
| Nav link (active) | Open Sans | 600 | 15px | — | `#111111` + 2px `#bf3529` underline |
| Search label | Jakarta | 700 | 16px | 0 | `#5e5e5e` |
| Hero word (LEGACY…) | Outfit | 700 | `calc(--media-w × 0.227)` — Figma: 200px @ 1440 | 15% (`0.15em`) | `#000000` |
| Column heading ("Architecture") | Jakarta | 700 | 16px | — | `--ink` |
| Column paragraph | Jakarta | 500 | 14px / 1.55 | — | `#4b4b4b` |

**Hero word notes:**
- Size scales with the image via `--media-w`; never hardcode px.
- The 15% tracking is implemented in JS after SplitText runs: `letter-spacing`
  is zeroed and each char's mask wrapper gets `margin-right: 0.15em` (none on
  the last char) — this keeps `text-align: center` exact. The CSS
  `letter-spacing: 0.15em` on `.hero-title` is only the pre-JS fallback.
  Don't "fix" either half without the other.

---

## 5. Login Page (`log/log-in/`)

Base body: Open Sans (same as home). Tokens mirrored from home.

| Element | Family | Weight | Size | Color |
|---|---|---|---|---|
| Brand | Jakarta | 700 | 26px | `#484848` |
| H1 ("Welcome back!") | Jakarta | 700 | 54px, `-0.01em` | `--ink` |
| Subtitle | Jakarta | 500 | 18px | `#8f8f8f` |
| OAuth button text | Jakarta | 600 | 15px | `--ink` |
| Field labels | Jakarta | 600 | 15px | `--ink` |
| Input text | Jakarta | 500 | 15px | `--ink`; placeholder `#b9b9b9` |
| "Forgot your password?" | Open Sans | 500 | 13px | `#8f8f8f` |
| Submit button | Jakarta | 600 | 14px | `#ffffff` on `#141414` |
| "Don't have an account?" | Jakarta | 500 | 12px | `#8f8f8f` |
| "Sign up" link | Jakarta | 700 | 16px | `--ink` (same treatment as home Search label) |
| Footer links (Help/Terms/Privacy) | Open Sans | 500 | 14px | `#b5b5b5` |

---

## 6. Building Page (`building/`)

| Element | Family | Weight | Size | Color |
|---|---|---|---|---|
| Brand | Jakarta | 700 | 26px | `#484848` |
| "SOON" | Outfit | 700 | `clamp(48px, 11vw, 150px)`, 15% tracking | `#000000` |
| Message | Jakarta | 500 | 16px | `#4b4b4b` |
| Links (Home / Log in) | Jakarta | 700 | 15px | `--ink` + 2px `#bf3529` underline |
| Footer | Jakarta | 500 | 13px | `#8f8f8f` |

---

## 7. Quick Rules for Future Pages

1. **Logo is sacred**: Jakarta 700 / 26px / `#484848` everywhere, no exceptions.
2. **Family roles**: Open Sans = base + nav/utility links; Jakarta = everything
   with visual weight (headings, labels, buttons, body copy); Outfit = giant
   display words only, always weight 700 with 15% tracking.
3. **Muted link text** is Open Sans 500 in `#8f8f8f` (or `#b5b5b5` for footers).
4. **Body copy** is Jakarta 500 at 14–16px in `#4b4b4b`, line-height ~1.55.
5. Load every weight you use in the Google Fonts URL — no faux-bold.
6. Colors come from the token table (§2); don't invent near-duplicates.
