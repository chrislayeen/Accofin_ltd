# 🚀 Antigravity Prompt — AccoFin Image Overhaul
> Paste this into Claude with your `index.html` attached. Do not modify the prompt — it is written to be followed exactly as-is.

---

## 🎯 Mission

You are a **senior frontend developer and UI/UX specialist**.

Your job is to fix every image-related issue on the AccoFin consultancy website (`accofin-ltd.vercel.app`) — a professional financial services site built in **plain HTML + CSS + Vite**, deployed on **Vercel**.

> **Golden Rule:** Do NOT change any copy, color scheme, layout structure, or typography. Only fix image usage, replace fake testimonial photos, and upgrade visual sections. Every change must make the site *more professional*, not different.

---

## 📋 Context — What the Site Is

| Property | Detail |
|---|---|
| **Brand** | AccoFin Consultancy |
| **Niche** | Financial & Tax Consultancy, Kerala, India |
| **Clients** | Indian SMEs + Foreign MNCs entering India |
| **Theme** | Dark background `#0D0E0F`, Gold accent `#C8A96E` |
| **Stack** | HTML, CSS, Vite, Vercel |
| **Icon Font** | Google Material Symbols |

---

## ❌ Problems to Fix (In Priority Order)

---

### PROBLEM 1 — Fake Testimonial Stock Photos `[CRITICAL]`

**What is wrong:**
Three testimonials use Unsplash stock photos as profile pictures of named, fictional clients. These are popular images that appear on thousands of websites. Any sophisticated client will recognise them as fake. This is the single biggest trust-killer on the site.

**Current broken code (do NOT keep this):**
```html
<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330
           ?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
     alt="Sarah Jenkins"/>

<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d
           ?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
     alt="Rahul Desai"/>

<img src="https://images.unsplash.com/photo-1560250097-0b93528c311a
           ?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
     alt="Marcus von Berg"/>
```

**Fix — Replace with initials avatars:**

Replace every testimonial `<img>` with this pattern:

```html
<!-- Sarah Jenkins → initials: SJ -->
<div class="avatar-initial" aria-label="Sarah Jenkins" style="
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C8A96E 0%, #8B6914 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #0D0E0F;
  flex-shrink: 0;
  letter-spacing: 0.02em;
">SJ</div>

<!-- Rahul Desai → RD -->
<!-- Marcus von Berg → MB -->
```

**Rules:**
- `SJ` = Sarah Jenkins → gold gradient
- `RD` = Rahul Desai → slightly darker gold `#B8952A` to `#6B4F0E`
- `MB` = Marcus von Berg → desaturated gold `#A89070` to `#5C4A2A`
- Each avatar must look distinct — vary the gradient direction and shade
- No two avatars should look identical

---

### PROBLEM 2 — Same Photos Used Twice on the Same Page `[HIGH]`

**What is wrong:**
The two Unsplash faces (`photo-1507003211169` and `photo-1494790108377`) appear **twice** — once in the floating "Trusted Globally" social proof strip and again in the testimonials section below. Users scrolling the page see the same face twice within seconds.

**Fix:**
Remove the floating avatar strip entirely. Delete this entire block from the HTML:

```html
<!-- DELETE THIS ENTIRE BLOCK -->
<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d..."/>
<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330..."/>
Trusted Globally
"Accofin made our India entry seamless..."
```

Replace it with a single clean trust badge using no photos:

```html
<div class="trust-strip">
  <span class="trust-icon">✦</span>
  <span class="trust-text">Trusted by 500+ businesses across India & globally</span>
</div>
```

Style it minimal — small gold `✦` icon, muted text, no avatars.

---

### PROBLEM 3 — All Unsplash Images Are Hotlinked `[HIGH]`

**What is wrong:**
Every Unsplash image is loaded directly from `images.unsplash.com` at runtime. This means:
- AccoFin has zero caching control
- If Unsplash CDN is slow, the site is slow
- Images can break if Unsplash changes their URL structure
- No `alt` text strategy is applied consistently

**Images currently hotlinked:**
```
https://images.unsplash.com/photo-1554224155-8d04cb21cd6c  ← "Financial analysis" section
https://images.unsplash.com/photo-1560472354-b33ff0c44a43  ← (if present)
```

**Fix:**
For every Unsplash content image (non-avatar):
1. Download the image at `1200px` width, `80` quality
2. Save to `/public/assets/images/` with a descriptive name
3. Reference locally in the HTML
4. Add descriptive, keyword-rich `alt` text

**Required naming convention:**
```
financial-clarity-analysis.jpg   ← replaces photo-1554224155
```

**Required alt text pattern:**
```html
<!-- ❌ Wrong -->
<img src="..." alt="image"/>
<img src="..." alt="Financial analysis and clarity"/>

<!-- ✅ Right — descriptive, specific, no keyword stuffing -->
<img src="./assets/images/financial-clarity-analysis.jpg"
     alt="Financial data analysis dashboard used in compliance auditing"
     loading="lazy"
     width="1200"
     height="800"/>
```

---

### PROBLEM 4 — Hero Section Has No Visual `[MEDIUM]`

**What is wrong:**
The hero is 100% text on a plain dark background. For a financial consultancy, the hero is the most important trust-building moment. There is no image, no visual context, no human element.

**Fix — Add a CSS-only animated background (no new image files needed):**

Add this to the hero section's CSS:

```css
.hero {
  position: relative;
  overflow: hidden;
}

/* Animated radial gold pulse */
.hero::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(200, 169, 110, 0.08) 0%,
    rgba(200, 169, 110, 0.03) 40%,
    transparent 70%
  );
  border-radius: 50%;
  animation: heroPulse 6s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

/* Subtle diagonal grid */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 59px,
      rgba(200, 169, 110, 0.03) 60px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 59px,
      rgba(200, 169, 110, 0.03) 60px
    );
  pointer-events: none;
  z-index: 0;
}

@keyframes heroPulse {
  0%   { transform: scale(1) translate(0, 0);   opacity: 0.6; }
  50%  { transform: scale(1.1) translate(-2%, 2%); opacity: 1; }
  100% { transform: scale(0.95) translate(2%, -1%); opacity: 0.7; }
}

/* Ensure hero content sits above the background effects */
.hero > * {
  position: relative;
  z-index: 1;
}
```

> This adds visual depth with **zero additional HTTP requests** and **zero new image files**.

---

### PROBLEM 5 — Advisor Photo Has Redundant Cache-Bust `[LOW]`

**What is wrong:**
```html
<!-- Current — double cache-busted -->
<img src="./assets/advisor_photo-D1V6MvL6.jpg?v=1771768222815"/>
```

Vite already baked `D1V6MvL6` into the filename as a content hash. The `?v=1771768222815` added by `cache-bust.js` is redundant.

**Fix:**
```html
<!-- Fixed — clean reference, Vite handles caching -->
<img src="./assets/advisor_photo-D1V6MvL6.jpg"
     alt="AccoFin senior financial advisor reviewing compliance documentation"
     loading="lazy"
     width="600"
     height="700"/>
```

Also delete `cache-bust.js` and remove its `<script>` tag from all HTML files.

---

## ✅ Output Requirements

Produce the following, clearly labelled:

```
1. index.html          ← Full file with all fixes applied
2. assets/images/      ← List of images to download with exact Unsplash URLs
3. CSS additions       ← The hero animation CSS to add to your stylesheet
4. IMAGES_CREDIT.md   ← Attribution file listing all Unsplash photos used
```

---

## 📐 Design Constraints — Do NOT Violate These

| Rule | Detail |
|---|---|
| No layout changes | Section order, grid structure, spacing must stay identical |
| No color changes | `#0D0E0F` bg, `#C8A96E` gold, `#F0EDE8` text — untouched |
| No copy changes | Every word of content stays exactly the same |
| No font changes | Playfair Display + DM Sans must remain |
| No new sections | Do not add or remove any page sections |
| Vite compatible | All asset paths must work with `vite build` |

---

## 🔍 Quality Check — Before Submitting Output

Run through this checklist mentally before outputting:

- [ ] Zero `images.unsplash.com` hotlinks remain in the HTML
- [ ] All three testimonial `<img>` tags replaced with initials avatars
- [ ] No two initials avatars are the same colour/gradient
- [ ] The floating avatar strip has been removed
- [ ] `?v=timestamp` removed from advisor photo src
- [ ] `cache-bust.js` script tag removed from HTML
- [ ] All `<img>` tags have descriptive `alt` text
- [ ] All content images have `loading="lazy"` and explicit `width`/`height`
- [ ] Hero has the CSS pulse animation added
- [ ] `IMAGES_CREDIT.md` attribution file created

---

> **Start by outputting `index.html` with all fixes. Then output the CSS additions. Then output `IMAGES_CREDIT.md`.**
