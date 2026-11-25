"use strict";
// Scaffold a real app, install it, and run its typecheck, tests and build.
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "crtsa-e2e-"));
const app = path.join(cwd, "e2e-app");
const shell = process.platform === "win32";

function step(label, cmd, args, dir, env) {
  const useShell = shell && cmd !== process.execPath;
  console.log(`\n=== ${label}`);
  const r = spawnSync(useShell ? [cmd, ...args].join(" ") : cmd, useShell ? [] : args, { cwd: dir, stdio: "inherit", shell: useShell, env: { ...process.env, ...env } });
  if (r.status !== 0) {
    console.error(`\nFAILED: ${label} (app left at ${app})`);
    process.exit(1);
  }
}

step("scaffold", process.execPath, [path.join(__dirname, "..", "bin", "install.js"), "e2e-app"], cwd);
step("typecheck", "npm", ["run", "typecheck"], app);
step("test", "npm", ["test", "--", "--watchAll=false"], app, { CI: "true" });
step("lint", "npx", ["eslint", "--max-warnings=0", "src"], app);
step("build", "npm", ["run", "build"], app, { CI: "true" });
console.log(`\nAll e2e steps passed. App at ${app}`);
