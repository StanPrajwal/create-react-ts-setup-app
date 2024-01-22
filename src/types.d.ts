// This file is used to declare global types , interfaces , image types,

// Example: Declare a custom interface for configuration options.
declare module "*.css";

//Declare image extentions here if use module import
declare module "*.avif";

declare interface AppConfig {
  apiUrl: string;
  debugMode: boolean;
}
