# create-react-ts-setup-app

Create a React + TypeScript app with Redux Toolkit, React Router and axios already set up.

## Usage

```bash
npx create-react-ts-setup-app my-app
cd my-app
npm start
```

The app name must be a valid npm package name (lower-case letters, digits, `-`, `_`, `.`).
The folder must not exist yet.

Options:

- `--skip-install` – copy the files but don't run `npm install`
- `--skip-git` – don't run `git init`

## What you get

- **TypeScript** with strict mode, on Create React App (`react-scripts` 5)
- **React 18** and **React Router 6** with lazy-loaded routes
- **Redux Toolkit** store with an example login slice
- **axios** instance that adds a bearer token to requests
- **Environment variables**: set `REACT_APP_API_URL` in `.env` (see `.env.example`)
- **ESLint** (`npm run lint`) and **Prettier** (`npm run format`)
- **Testing Library** + Jest with a sample test (`npm test`)
- 403 and 500 error pages

## Developing this package

- `template/` holds the app that gets copied; `bin/install.js` is the CLI.
- `npm test` runs fast CLI tests (no install).
- `npm run test:e2e` scaffolds a real app in a temp folder, installs it, then runs its
  typecheck, tests and build. It takes a few minutes.
