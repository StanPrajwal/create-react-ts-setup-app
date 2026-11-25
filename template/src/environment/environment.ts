// Set VITE_API_URL in a .env file (see .env.example) or in your shell.
// Vite reads .env, .env.development and .env.production automatically.
export const environment = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
};
