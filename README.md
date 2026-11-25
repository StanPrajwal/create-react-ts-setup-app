# create-react-ts-setup-app

Create a React + TypeScript app with Redux Toolkit, React Router and axios already set up.

## Usage

```bash
npx create-react-ts-setup-app my-app
cd my-app
npm start
```

The app name must be a valid npm package name (lower-case letters, digits, `-`, `_`, `.`).
The folder must not exist yet. The generated app needs Node 22.12+, 24 or 26+.

Options:

- `--skip-install` – copy the files but don't run `npm install`
- `--skip-git` – don't run `git init`

## What you get

- **Vite 8** dev server and build, **TypeScript 6** in strict mode
- **React 19** and **React Router 7** with lazy-loaded routes
- **Redux Toolkit** store with an example login slice
- **axios** instance that adds a bearer token to requests
- **Environment variables**: set `VITE_API_URL` in `.env` (see `.env.example`)
- **ESLint** flat config with typescript-eslint and React Hooks rules (`npm run lint`), **Prettier** (`npm run format`)
- **Vitest** + Testing Library with a sample test (`npm test`)
- 403 and 500 error pages

## Developing this package

- `template/` holds the app that gets copied; `bin/install.js` is the CLI.
- `npm test` runs fast CLI tests (no install).
- `npm run test:e2e` scaffolds a real app in a temp folder, installs it, then runs its
  typecheck, tests, lint, format check, build and `npm audit`. It takes a few minutes.
