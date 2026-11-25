#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const TEMPLATE_DIR = path.join(__dirname, "..", "template");
// npm never publishes files named .gitignore, so the template ships it as "gitignore".
const RENAMES = { gitignore: ".gitignore" };

function usage() {
  console.log("Usage: npx create-react-ts-setup-app <app-name> [--skip-install] [--skip-git]");
}

function parseArgs(argv) {
  const opts = { name: undefined, skipInstall: false, skipGit: false, help: false };
  for (const arg of argv) {
    if (arg === "--skip-install") opts.skipInstall = true;
    else if (arg === "--skip-git") opts.skipGit = true;
    else if (arg === "-h" || arg === "--help") opts.help = true;
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    else if (opts.name === undefined) opts.name = arg;
    else throw new Error(`Unexpected argument: ${arg}`);
  }
  return opts;
}

// Lower-case npm package name rules, unscoped (the folder name becomes the package name).
function validateName(name) {
  if (!name) return "Please provide a name for your app.";
  if (name.length > 214) return "The app name must be 214 characters or fewer.";
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
    return "The app name may only contain lower-case letters, digits, '-', '_' and '.', and must start with a letter or digit.";
  }
  if (name === "node_modules" || name === "favicon.ico") return `"${name}" is a reserved name.`;
  return null;
}

function copyTemplate(dest) {
  fs.cpSync(TEMPLATE_DIR, dest, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(TEMPLATE_DIR, src).split(path.sep)[0];
      return rel !== "node_modules" && rel !== "build" && rel !== "package-lock.json";
    },
  });
  for (const [from, to] of Object.entries(RENAMES)) {
    const fromPath = path.join(dest, from);
    if (fs.existsSync(fromPath)) fs.renameSync(fromPath, path.join(dest, to));
  }
  const pkgPath = path.join(dest, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = path.basename(dest);
  pkg.version = "0.1.0";
  pkg.private = true;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

function run(cmd, args, cwd) {
  // npm is a .cmd shim on Windows, which needs a shell. The arguments are fixed strings
  // (never user input), so they are joined into one command line for the shell.
  const result =
    process.platform === "win32"
      ? spawnSync([cmd, ...args].join(" "), { cwd, stdio: "inherit", shell: true })
      : spawnSync(cmd, args, { cwd, stdio: "inherit" });
  return result.status === 0;
}

function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(err.message);
    usage();
    return 1;
  }
  if (opts.help) {
    usage();
    return 0;
  }

  const error = validateName(opts.name);
  if (error) {
    console.error(error);
    usage();
    return 1;
  }

  const dest = path.resolve(process.cwd(), opts.name);
  if (fs.existsSync(dest)) {
    console.error(`The folder "${opts.name}" already exists. Choose another name or remove it.`);
    return 1;
  }

  console.log(`Creating a new React + TypeScript app in ${dest}...`);
  try {
    copyTemplate(dest);
  } catch (err) {
    console.error("Failed to copy the template:", err.message);
    fs.rmSync(dest, { recursive: true, force: true });
    return 1;
  }

  if (!opts.skipGit) {
    const hasGit = spawnSync("git", ["--version"], { stdio: "ignore" }).status === 0;
    if (hasGit && run("git", ["init", "--quiet"], dest)) {
      console.log("Initialized a git repository.");
    }
  }

  if (!opts.skipInstall) {
    console.log("Installing dependencies. This might take a couple of minutes...");
    if (!run("npm", ["install"], dest)) {
      console.error(`\nFailed to install dependencies. Run "npm install" inside ${opts.name} to retry.`);
      return 1;
    }
  }

  console.log(`\nSuccess! Created ${opts.name} at ${dest}`);
  console.log("Next steps:");
  console.log(`  cd ${opts.name}`);
  if (opts.skipInstall) console.log("  npm install");
  console.log("  npm start");
  return 0;
}

if (require.main === module) {
  process.exitCode = main();
}

module.exports = { parseArgs, validateName, copyTemplate };
