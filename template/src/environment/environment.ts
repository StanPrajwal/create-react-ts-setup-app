// Set REACT_APP_API_URL in a .env file (see .env.example) or in your shell.
// Create React App reads .env, .env.development and .env.production automatically.
export const environment = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
};
