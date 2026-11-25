# React + TypeScript app

Needs Node 22.12+, 24 or 26+.

Created with [create-react-ts-setup-app](https://www.npmjs.com/package/create-react-ts-setup-app).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` / `npm start` | Start the Vite dev server at http://localhost:3000 |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run tests once with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | Type-check with `tsc` |
| `npm run lint` | Lint with ESLint (`npm run lint:fix` to auto-fix) |
| `npm run format` | Format with Prettier |

## API URL

Copy `.env.example` to `.env` and set `VITE_API_URL`. Use `.env.development` and
`.env.production` for per-environment values; Vite picks the right one. Only variables
starting with `VITE_` reach the browser code, so never put secrets in them.

## Layout

- `src/routes` – routes (`AppRoutes.tsx`), lazy-loaded pages
- `src/redux` – Redux Toolkit store and slices
- `src/config/axios.config.ts` – axios instance that adds the auth token
- `src/context` – React context for app-wide values
- `src/error-pages` – 403 and 500 pages
