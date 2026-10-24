# TSoft — Enterprise Software Demo Website + Admin Dashboard

A complete, responsive demo website for a **fictional** enterprise software company, with a
dedicated demo login and a separate, protected administration dashboard.

> **TSoft is a fictional demonstration company.** Every company detail, statistic, product,
> customer, and financial figure in this project is invented sample content. Nothing here
> represents a real company, real customers, or real earnings.

---

## What's inside

**Public marketing site**

| Page | Route |
| --- | --- |
| Home (hero, services, products, why TSoft, demo statistics, CTA) | `/` |
| About Us (introduction, mission, vision, values, approach, expertise) | `/about` |
| Services (six detailed service sections) | `/services` |
| Products (catalogue of four fictional products) | `/products` |
| Product detail (features, UI preview, use cases, demo CTA) | `/products/:slug` |
| Contact (validated form, simulated submission) | `/contact` |
| Privacy Policy / Terms of Service | `/privacy`, `/terms` |

**Demo authentication**

| Page | Route |
| --- | --- |
| Split-screen demo login | `/demo-login` |

**Admin application** (all routes protected; a separate sidebar + topbar layout)

`/admin/dashboard` · `/admin/users` · `/admin/administrators` · `/admin/roles` ·
`/admin/products` · `/admin/services` · `/admin/notifications` · `/admin/announcements` ·
`/admin/tickets` · `/admin/analytics` · `/admin/reports` · `/admin/activity` ·
`/admin/settings` · `/admin/security` · `/admin/api` · `/admin/backups` ·
`/admin/system-health` · `/admin/profile`

## Demo credentials

```
Email:    admin@tsoft.demo
Password: TSoftDemo2026!
```

The login page also has a **Use Demo Account** button that fills these in for you.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite** build tooling
- **Tailwind CSS** with a small custom design-token layer
- **React Router** for routing (including protected routes)
- **Lucide** icons
- **Recharts** for dashboard charts

No backend is required. Demonstration records and preferences are persisted in the browser's
`localStorage`.

---

## Getting started

Requires **Node.js 20+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

Other scripts:

```bash
npm run typecheck   # TypeScript check without emitting
```

---

## Project structure

```
src/
├── App.tsx                     # Routes (public site, demo login, protected admin)
├── main.tsx                    # Entry point
├── index.css                   # Tailwind layers + design tokens
├── components/
│   ├── Logo.tsx
│   ├── ui/                     # Design system: Button, Card, Modal, DataTable,
│   │                           # StatCard, Pagination, Toast, ConfirmDialog, …
│   ├── site/                   # Navbar, Footer, SiteLayout
│   └── admin/                  # Sidebar, Topbar, AdminLayout, status pills
├── lib/
│   ├── auth.tsx                # Demo auth context + RequireAuth guard
│   ├── demoData.ts             # All fictional demonstration data
│   ├── useCollection.ts        # localStorage-backed demo collections
│   ├── useNotifications.tsx    # Shared notification state
│   ├── csv.ts                  # CSV export helper
│   ├── storage.ts              # Typed localStorage helpers
│   ├── types.ts                # Shared TypeScript types
│   └── utils.ts                # Formatting helpers
└── pages/
    ├── site/                   # Public pages
    ├── DemoLogin.tsx
    └── admin/                  # Admin pages
```

---

## Deploying to GitHub Pages

This repository is already set up to deploy to GitHub Pages via
`.github/workflows/deploy.yml`. The workflow runs on every push to `main`, builds the app, and
publishes it.

**Live site:** `https://ca4219248-blip.github.io/tsoft-website/`

If you fork or rename the repository, update the base path in the workflow so asset URLs resolve
correctly:

```yaml
- run: npm run build
  env:
    VITE_BASE: /<repo-name>/   # project page (https://<user>.github.io/<repo>/)
```

Use `VITE_BASE: /` instead if you deploy to a **user/organisation page**
(`https://<user>.github.io/`).

Deep links (e.g. `/admin/dashboard`) work because the workflow copies the built `index.html` to
`404.html`, so GitHub Pages serves the app shell for unknown paths and the client-side router
takes over. If you deploy to a different host, apply the same SPA fallback there.

---

## Important notes

**This is a demonstration, not a real product.**

- **Authentication is a frontend-only mock.** It validates the demo credentials in the browser
  and stores a session flag in `localStorage`. It is **not** production-grade authentication and
  must never be used to protect real data. Real deployments need server-side authentication and
  authorisation.
- **No data leaves the browser.** There is no backend, no database, and no analytics. Changes you
  make in the admin dashboard are stored locally and can be reset from the relevant screens.
- **The contact form is simulated.** It validates and shows a success state, but it does **not**
  send email, and the interface says so.
- **Permissions are simulated.** The Roles & Permissions matrix is illustrative; nothing enforces
  it without a secure backend.
- **System health shows no fabricated metrics.** Where a backend or monitoring service would be
  required, the page shows `Demo Data` or `Not Connected` rather than inventing live values.
- **API keys are masked examples only.** No real secrets exist anywhere in this codebase.
- **Statistics are fictional.** The figures on the home page and dashboard are invented sample
  data and must not be presented as verified achievements or real earnings.
