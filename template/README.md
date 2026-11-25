# React + TypeScript app

Created with [create-react-ts-setup-app](https://www.npmjs.com/package/create-react-ts-setup-app).

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the dev server at http://localhost:3000 |
| `npm run build` | Build for production into `build/` |
| `npm test` | Run tests in watch mode |
| `npm run typecheck` | Type-check with `tsc` |
| `npm run lint` | Lint and auto-fix with ESLint |
| `npm run format` | Format with Prettier |

## API URL

Copy `.env.example` to `.env` and set `REACT_APP_API_URL`. Use `.env.development` and
`.env.production` for per-environment values; Create React App picks the right one.

## Layout

- `src/routes` – routes (`AppRoutes.tsx`), lazy-loaded pages
- `src/redux` – Redux Toolkit store and slices
- `src/config/axios.config.ts` – axios instance that adds the auth token
- `src/context` – React context for app-wide values
- `src/error-pages` – 403 and 500 pages
