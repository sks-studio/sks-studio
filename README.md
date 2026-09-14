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
| `/projects/:slug` | A project posted from the admin — its own shareable page |
| `/admin` | Admin: clients from the wizard and contact form, and projects to post and advertise |

Site-wide: light/dark theme (remembered per visitor), preloader, page-wipe transitions, and the **SKS Project Wizard** (product → stage → contact).

## Editing content

All copy — services, products, page headings, contact email — lives in [`src/content.js`](src/content.js). Change wording there; layout files don't need touching.

Enquiries (wizard and contact form) open the visitor's email app pre-filled and addressed to `CONTACT_EMAIL`. There is no backend.

## Images

Images live in `public/assets/`, compressed for fast loading (about 320 KB in total):

- `sks-logo.jpg` — logo (header + favicon), 256 px wide
- `sks-founder-vision.jpg`, `sks-founder-portal.jpg`, `sks-team-ai.jpg` — hero and product photos, JPEG at most 1920 px wide

To replace one, keep the same filename. If an image is ever missing, the site shows a navy gradient (or an "SKS" monogram for the logo) instead of a broken image.

## Admin and database (Supabase)

The admin at `/admin` runs on a Supabase project named **sksstudiodb**. Its layout follows the GRNLeaf admin: sidebar sections, stat tiles, panels and tables.

- **Clients:** every wizard or contact-form enquiry lands here as a new client. You can search, filter by status (New → Contacted → Proposal sent → Active → Completed / Lost), add clients by hand, edit, delete and download a CSV.
- **Projects:** create a post with a title, summary, description, image and button text. Set it to *Published* to show it on `/projects` with its own page at `/projects/<link>`. *Featured* posts show first.
- **Staff:** two roles. *Superadmin* can do everything, including adding, editing and removing staff. *Staff* can manage clients and projects but can't change the team. You're seeded as superadmin, and the database always keeps at least one active superadmin.
- **Demo:** *Explore the demo* on the admin sign-in page opens the full admin with sample clients, projects and staff. No login is needed and nothing is saved.

**Setup (one time):**

1. Apply [`supabase/migrations/20260914000000_sks_admin.sql`](supabase/migrations/20260914000000_sks_admin.sql). It creates the tables, row-level security, the `project-images` bucket, and the staff list (`public.staff`) with `sir.karabom@gmail.com` as superadmin.
2. In Supabase, go to **Authentication → Users → Add user**, create the admin account (tick *Auto Confirm User*) and store the password in Bitwarden. Only active staff with a confirmed email address get access.
3. Recommended: under **Authentication → Sign In / Providers**, turn off *Allow new users to sign up*.
4. Put the project URL and publishable (anon) key in `src/config.js` defaults, or set them as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. They're safe to be public; row-level security is what protects the data.

To add staff, a superadmin uses the admin's **Staff** page, then invites the same email under **Authentication → Users → Invite user**.

Until Supabase is connected, the wizard and contact form fall back to a pre-filled email, and `/admin` shows a "Database not connected" notice.

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
