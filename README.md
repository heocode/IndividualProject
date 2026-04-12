# Heocode — Company Website

A multi-page website for a fictional software development company **Heocode**. Built as a college assignment using only vanilla HTML, CSS, and JavaScript — no frameworks or build tools.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements, ARIA attributes) |
| Styling | CSS3 — modular files, Flexbox, CSS Grid, media queries |
| Behaviour | Vanilla JavaScript (ES6+) |
| Font | Inter — loaded via Google Fonts CDN |
| Icons | Inline SVG |
| Images | Unsplash (CDN links) + local SVG assets |

---

## Pages

| File | Route |
|---|---|
| `html/index.html` | Home |
| `html/solutions.html` | Solutions |
| `html/projects.html` | Projects |
| `html/ecommerce-suite.html` | Project detail — E-Commerce Suite |
| `html/enterprise-analytics.html` | Project detail — Enterprise Analytics Platform |
| `html/mobile-health.html` | Project detail — Mobile Health & Wellness App |
| `html/contact.html` | Contact |

---

## Features

### Navigation
- Fixed header with logo and four nav links (Home, Solutions, Projects, Contact)
- **"Get Started"** button in the nav opens the contact modal
- Active page link highlighted via `menu__item-link--active` class set in markup
- **Mobile burger menu** — toggles a slide-in nav panel with a dark overlay; closes on overlay click or a second burger press; locks page scroll while open

### Home Page
- **Hero section** — headline, description, two CTA buttons ("Start Your Project" opens the contact modal, "View Solutions" links to the Solutions page), hero image with a "100+ Projects Delivered" badge
- **About section** — short company description
- **Technologies section** — grid of six technology cards (React, Node.js, Python, AWS, Mobile, Database) with icons
- **Client reviews carousel** — three testimonial slides; auto-advances every 10 seconds; supports dot navigation, touch swipe (50 px threshold), and resets the timer on manual interaction
- **CTA banner** — links to the Contact page

### Solutions Page
Three feature cards, each with:
- Colour-coded banner icon (blue / green / purple)
- Title, description, and a bullet list of key features
- "Learn more" arrow link to the Projects page

Solutions covered: **Analytics Platform**, **Mobile Health App**, **E-Commerce Suite**. A bottom CTA section opens the contact modal.

### Projects Page
Three project cards in an alternating image-text layout:
- **Enterprise Analytics Platform** → links to `enterprise-analytics.html`
- **Mobile Health & Wellness App** → links to `mobile-health.html`
- **Full-Scale E-Commerce Suite** → links to `ecommerce-suite.html`

Each card shows a project image, a category badge, a description, and a "View Case Study" arrow link.

### Project Detail Pages
All three detail pages share the same `projectTemplate.css` and structure:

- **Breadcrumb navigation** — Projects → current page title
- **Hero** — category badge, title, description, and a large project image
- **Technology stack bar** — scrollable tag list of all technologies used in the given project
- **Key features list** — icon + text items
- **Screenshot gallery** — grid of project screenshots; clicking any image opens the **lightbox**
- **Results / metrics section** — outcome stats
- **Bottom CTA** — gradient banner linking to the Contact page

**Lightbox** (only on detail pages with `.ea-screenshot__image` elements):
- Previous / next navigation buttons
- Dot indicators
- Keyboard support: `←` / `→` to navigate, `Escape` to close
- Touch swipe support (50 px threshold)
- Click outside the image to close

### Contact Page
Two-column layout:
- **Left — Contact Information**: email, phone, office address (Toronto, ON), and a "Why Choose Heocode?" bullet list
- **Right — Send Us a Message form**: Full Name, Email Address, Project Type (dropdown), Budget Range (dropdown), Project Details (textarea)

Form uses native HTML5 `checkValidity()` for validation. On successful submit the form is replaced with an inline success message.

### Contact Modal
Available on every page via the header "Get Started" button and contextual CTA buttons throughout the site. Same fields as the Contact page form. Closes via:
- The × button
- Clicking the backdrop overlay
- `Escape` key

On successful submit, the modal content is replaced with a success message that includes a "Close" button.

### Footer
Three-column grid: brand info + social links (GitHub, Instagram, YouTube), Quick Links, Services list. Consistent across all pages.

---

## How to Run

No installation or server required. Open the entry point directly in any modern browser:

```
open html/index.html
```

All asset paths are relative (`../css/`, `../js/`, `../images/`), so the file must be opened from within the `html/` directory or served from the repo root via a local server such as VS Code Live Server.
