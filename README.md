# IRR &middot; SEC Qualified Buyer Inter-Registrar Registry System

Admin dashboard for tracking SEC-qualified buyer accreditation, ICANN-accredited
registrars, inter-registrar domain transfers, and the compliance audit trail.

## Stack
- React 19 + React Router 7
- **Vite** (dev server + build tool)
- Bootstrap 5.3 (grid/utilities)
- Chart.js + react-chartjs-2 (line, bar, and doughnut charts)
- Axios (API client stub — currently reads from mock data)

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

To build for production:

```bash
npm run build
```

Output goes to `build/` (static HTML/CSS/JS — deployable to Vercel, Netlify,
GitHub Pages, Cloudflare Pages, or any static host).

To preview the production build locally:

```bash
npm run preview
```

## Project structure

```
index.html              Vite entry HTML (loads src/main.jsx)
vite.config.js           Vite + React plugin config
src/
  main.jsx               React entry point (was src/index.js under CRA)
  App.jsx                Route definitions (was src/App.js under CRA)
  api/client.js           axios instance (point VITE_API_BASE_URL at your backend)
  charts/chartSetup.js    Chart.js registration + shared color palette
  components/             Sidebar, Topbar, Layout, shared UI primitives, icons
  data/mockData.js         mock buyers, registrars, transfers, audit logs, compliance reports
  pages/                  Dashboard, QualifiedBuyers, Registrars, Transfers, Compliance, AuditLog, Settings
  styles/theme.css         design tokens + component styles (primary color: rgb(1, 71, 47))
```

## Connecting a real backend

Replace the imports from `src/data/mockData.js` in each page with calls through
`src/api/client.js`, e.g.:

```js
import client from "../api/client";
const { data } = await client.get("/qualified-buyers");
```

Set `VITE_API_BASE_URL` in a `.env` file at the project root to point at your API
(Vite only exposes env vars prefixed with `VITE_` to client code).

## Migrated from Create React App

This project originally used Create React App (`react-scripts`) and has been
converted to Vite for faster dev-server startup and hot reload. Notable changes:
- `public/index.html` &rarr; `index.html` at the project root
- `src/index.js` &rarr; `src/main.jsx`
- `src/App.js` &rarr; `src/App.jsx`
- `process.env.REACT_APP_*` &rarr; `import.meta.env.VITE_*`
- `npm start` still works as an alias for `npm run dev`
