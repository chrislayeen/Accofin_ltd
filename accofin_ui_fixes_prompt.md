# 🎯 Antigravity Prompt — AccoFin UI Consistency Fixes
> **Scope:** 4 surgical UI fixes only. Nothing else changes.  
> **Attach:** `index.html` · `main.93hf82.css` · all other `.html` pages  
> **Behave as:** Senior frontend developer — precise, no side effects, no regressions

---

## 🔴 PRIME DIRECTIVE

You are making **4 targeted fixes only**. You must not:
- Touch any layout, spacing, or grid
- Change any copy or wording
- Modify anything not explicitly listed below
- "Improve" anything not asked for
- Introduce new classes unless absolutely necessary

If a fix can be done with a single CSS rule, do it that way.
If a fix requires HTML changes, change the minimum number of elements.

**After every fix, mentally ask: "Did I break anything else?" If yes, undo and find a safer approach.**

---

## FIX 1 — Ampersand Font Style Consistency

### What is wrong
The hero badge text **"India Regulatory & Transaction Support"** uses a styled ampersand `&` — likely a different font, weight, or italic treatment that makes it visually distinct.

This styled `&` treatment does **not** appear in other section titles and badges across the site, creating inconsistency.

### What to do

**Step 1 — Identify the exact style of the `&` in the hero badge.**

Look at this element in the HTML:
```html
India Regulatory & Transaction Support
```
Find what CSS rule makes its `&` look different — it may be:
- A specific font-family applied to the badge class
- An italic or font-weight variation
- A `<span>` wrapping the `&`

**Step 2 — Create one reusable class:**
```css
.amp {
  /* Copy the exact font-style, font-family, font-weight,
     and color of the & in the hero badge — do not invent anything new */
  font-style: italic;          /* adjust to match actual hero badge & style */
  font-family: Georgia, serif; /* adjust to match actual hero badge & style */
}
```
> ⚠️ Do NOT guess the style. Read the existing CSS first, then mirror it exactly.

**Step 3 — Wrap every `&` in section titles and badges with this class:**

Apply `<span class="amp">&amp;</span>` to every `&` that appears in:
- Section heading tags (`h1`, `h2`, `h3`)
- Badge/tag labels (the small uppercase labels above section titles)
- Card titles

**Do NOT apply to:**
- Body paragraph text
- Button labels
- Footer links
- Nav links

**Example:**
```html
<!-- ❌ Before -->
<h2>Structured Finance & Compliance Operating Systems</h2>

<!-- ✅ After -->
<h2>Structured Finance <span class="amp">&amp;</span> Compliance Operating Systems</h2>
```

**Apply across ALL pages:** `index.html`, `about.html`, `contact.html`, `how_we_work.html`, `global_companies.html`, `indian_businesses.html`

---

## FIX 2 — "Choose Your Path" Cards Visibility

### What is wrong
The two path cards (**Global Business** and **Indian Business**) are invisible or nearly invisible when the user is not hovering over them. This means on page load, users see empty card outlines with no content — the cards only become visible on hover.

This is a **critical UX bug** — users should see the full card content by default at all times. Hover should only enhance, never reveal.

### Root cause
The card content opacity, color, or visibility is being controlled by a CSS hover state that hides it in its default (non-hovered) state. Likely one of:
```css
/* Bug — content hidden by default */
.path-card .card-content { opacity: 0; }
.path-card:hover .card-content { opacity: 1; }

/* Or */
.path-card { opacity: 0.15; }
.path-card:hover { opacity: 1; }

/* Or */
.path-card .card-features { visibility: hidden; }
.path-card:hover .card-features { visibility: visible; }
```

### What to do

**Step 1 — Find the exact CSS rule causing the hidden state.**

Search the stylesheet for any rule targeting `.path-card`, `.card-content`, `.card-features`, `.card-link`, or any child of the path card that sets:
- `opacity` to anything below `1` in non-hover state
- `visibility: hidden`
- `color: transparent`
- `transform` that moves content off-screen
- `max-height: 0` or `height: 0`

**Step 2 — Fix by making the default state fully visible:**

```css
/* ✅ Cards must be fully visible at all times */
.path-card {
  opacity: 1;
  visibility: visible;
}

.path-card .card-content,
.path-card .card-features,
.path-card .card-link,
.path-card .card-subtitle,
.path-card .card-tag {
  opacity: 1;
  visibility: visible;
  color: inherit; /* or the correct explicit color */
}
```

**Step 3 — Preserve hover enhancement only:**

Hover should only do subtle things like:
- Elevate the card with `transform: translateY(-4px)`
- Brighten the border color
- Add a box-shadow

```css
/* ✅ Hover enhances — does not reveal */
.path-card {
  border: 1px solid rgba(200, 169, 110, 0.18);
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.path-card:hover {
  border-color: rgba(37, 99, 235, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.08);
}
```

**⚠️ Regression check:** After this fix, view the page with no hover interaction. Both cards must be fully readable. If any text is still invisible, find its specific CSS rule and fix that too.

---

## FIX 3 — "Request a Strategic Consultation" Italic Title

### What is wrong
The CTA section title **"Request a Strategic Consultation"** has the words **"Strategic Consultation"** displayed in normal (non-italic) text. They should be in italic to create visual emphasis and hierarchy.

### What to do

**Step 1 — Find this heading in the HTML.** It will look like:
```html
<h2>Request a Strategic Consultation</h2>
<!-- or -->
<h2>Let's Structure Your India Success.</h2>
<!-- Find the exact wording in your file -->
```

**Step 2 — Wrap the italic portion in `<em>` with a CSS override:**

```html
<!-- ✅ After -->
<h2>Request a <em class="title-italic">Strategic Consultation</em></h2>
```

```css
/* Italic treatment — preserves existing color, only changes font-style */
.title-italic {
  font-style: italic;
  /* Do NOT set color here — let it inherit from parent h2 */
}
```

**Why `<em>` with a class and not bare `<em>`?**
Because bare `<em>` may already have CSS rules in your stylesheet that affect color or weight. The class isolates this specific italic treatment and prevents unintended side effects.

**⚠️ Do NOT change:**
- The word "Request a" — stays normal weight and style
- The heading's color, size, or font-family
- Any other CTA section styling

---

## FIX 4 — Blue Color Standardization Across All Title Accents

### What is wrong
The hero badge **"India Regulatory, Finance & Transaction Support"** uses a specific blue shade on the text **"& Transaction Support"**.

Other page titles and section headings use a **different blue shade** — creating visible color inconsistency across the site.

### What to do

**Step 1 — Extract the exact blue hex from the hero badge.**

Find this element and read its exact color value from the CSS:
```
"& Transaction Support" in "India Regulatory, Finance & Transaction Support"
```
It may be defined as:
- A CSS variable: `var(--blue-accent)` or similar
- A hardcoded hex: e.g. `#1D4ED8` or `#2563EB` or `#3B82F6`
- An inline style

**Record that exact value. Call it `BRAND_BLUE` for this prompt.**

**Step 2 — Audit every blue used in titles across all pages.**

Search the stylesheet and all HTML files for any blue color value appearing in:
- `h1`, `h2`, `h3` color rules
- `.title-blue` class
- `.section-title` color
- Any `span` inside a heading with a blue color
- Any inline `style="color: #..."` on heading elements

List every unique blue value found. They must all be replaced with `BRAND_BLUE`.

**Step 3 — Standardize to one single CSS variable:**

Add to the top of your CSS file:
```css
:root {
  --brand-blue: BRAND_BLUE; /* paste the exact hex from Step 1 */
}
```

Replace every blue color in title-related rules with `var(--brand-blue)`:

```css
/* All of these must point to the same value */
.title-blue        { color: var(--brand-blue); }
.hero-badge        { color: var(--brand-blue); } /* if applicable */
h1 .blue-accent,
h2 .blue-accent    { color: var(--brand-blue); }
```

**Step 4 — Update HTML span colors if hardcoded:**

If any heading span has an inline style with a blue color:
```html
<!-- ❌ Before — hardcoded, inconsistent -->
<span style="color: #3B82F6">Transaction Support</span>

<!-- ✅ After — uses the variable via class -->
<span class="title-blue">Transaction Support</span>
```

**Apply across ALL pages.**

**⚠️ Do NOT change:**
- Any blue used in buttons (they may intentionally differ)
- Any blue used in borders or backgrounds
- Any blue used in non-heading body text or links
- Only blue values inside `h1`, `h2`, `h3`, badges, and title spans

---

## 🔁 REGRESSION TEST — Run After All 4 Fixes

Before outputting, mentally load each page and check:

```
index.html
  [ ] Hero badge & is styled consistently
  [ ] Path cards are fully visible without hovering
  [ ] Path cards still animate on hover
  [ ] CTA title "Strategic Consultation" is in italic
  [ ] All title blues match the hero badge blue exactly

about.html
  [ ] All & in headings use .amp class
  [ ] All title blues match

contact.html
  [ ] All & in headings use .amp class
  [ ] All title blues match

how_we_work.html
  [ ] All & in headings use .amp class
  [ ] All title blues match

global_companies.html
  [ ] All & in headings use .amp class
  [ ] All title blues match

indian_businesses.html
  [ ] All & in headings use .amp class
  [ ] All title blues match

Global CSS
  [ ] --brand-blue variable defined at :root
  [ ] .amp class defined
  [ ] .title-italic class defined
  [ ] No path-card content hidden in default state
```

---

## 📤 OUTPUT FORMAT

Output in this exact order:

```
1. CSS_ADDITIONS.css      — All new/modified CSS rules only
2. index.html             — Full file
3. about.html             — Full file
4. contact.html           — Full file
5. how_we_work.html       — Full file
6. global_companies.html  — Full file
7. indian_businesses.html — Full file
```

> For each file, add a one-line comment at the top:  
> `<!-- Fixed: FIX 1, FIX 2, FIX 3, FIX 4 — [date] -->`  
> This makes it easy to track what changed.
