// Adds matchers such as toBeInTheDocument() to Vitest's expect,
// and unmounts rendered components after each test.
// The matchers are registered on this file's own `expect` (rather than importing
// "@testing-library/jest-dom/vitest") so they land on the same Vitest instance the
// tests use, even when Windows resolves the project through a short (8.3) path.
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";
// Type-only: brings in the matcher types without loading the module at runtime.
import type {} from "@testing-library/jest-dom/vitest";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
