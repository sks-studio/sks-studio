# SKS Studio

Marketing site for **SKS Studio** (Systems Knowledge & Software (Pty) Ltd) — business software for South African businesses, built one business at a time. React + Vite, deployed on Vercel.

## Pages

| Route | What's on it |
|---|---|
| `/` | Hero slideshow, the studio, products, method (Choose → Build → Launch), the seven service spaces, closing CTA |
| `/about` | Purpose and the three working principles |
| `/services` | All seven service spaces and the method |
| `/projects` | The three products, each opening the project wizard pre-filled |
| `/contact` | Email plus a short enquiry form |

Site-wide: light/dark theme (remembered per visitor), preloader, page-wipe transitions, and the **SKS Project Wizard** (product → stage → contact).

## Editing content

All copy — services, products, page headings, contact email — lives in [`src/content.js`](src/content.js). Change wording there; layout files don't need touching.

Enquiries (wizard and contact form) open the visitor's email app pre-filled and addressed to `CONTACT_EMAIL`. There is no backend.

## Images

Images live in `public/assets/`, compressed for fast loading (about 320 KB in total):

- `sks-logo.jpg` — logo (header + favicon), 256 px wide
- `sks-founder-vision.jpg`, `sks-founder-portal.jpg`, `sks-team-ai.jpg` — hero and product photos, JPEG at most 1920 px wide

To replace one, keep the same filename. If an image is ever missing, the site shows a navy gradient (or an "SKS" monogram for the logo) instead of a broken image.

## Local development

```bash
npm install
npm run dev
```

## Deploying to Vercel

`vercel.json` sets the Vite preset, `npm run build`, output `dist/`, and an SPA rewrite so every route works on refresh.

**Git (recommended):** push to GitHub, then in Vercel choose *Add New → Project*, import the repo and click *Deploy*.

**CLI:**
```bash
npx vercel --prod
```

## Structure

- `src/content.js` — all site copy
- `src/pages/` — Home, About, Services, Projects, Contact, NotFound
- `src/components/` — Header, Footer, Preloader, Wizard, PageHero, Closing, MethodList, TransitionLink, SafeImg
- `src/lib/site.js` — page titles, reduced-motion check, mailto builder
- `src/index.css` — design tokens (light + dark) and all styles
