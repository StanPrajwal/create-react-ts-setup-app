"use strict";

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { validateName, parseArgs } = require("../bin/install.js");

const CLI = path.join(__dirname, "..", "bin", "install.js");

function runCli(args, cwd) {
  return spawnSync(process.execPath, [CLI, ...args], { cwd, encoding: "utf8" });
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "crtsa-"));
}

test("validateName", () => {
  assert.strictEqual(validateName("my-app"), null);
  assert.ok(validateName(undefined));
  assert.ok(validateName("My App"));
  assert.ok(validateName("a; rm -rf ~"));
  assert.ok(validateName("../escape"));
  assert.ok(validateName(".hidden"));
});

test("parseArgs", () => {
  assert.deepStrictEqual(parseArgs(["x", "--skip-install"]), {
    name: "x",
    skipInstall: true,
    skipGit: false,
    help: false
  });
  assert.throws(() => parseArgs(["--nope"]));
  assert.throws(() => parseArgs(["a", "b"]));
});

test("fails without a name and creates nothing", () => {
  const cwd = tmpDir();
  const r = runCli([], cwd);
  assert.strictEqual(r.status, 1);
  assert.deepStrictEqual(fs.readdirSync(cwd), []);
});

test("refuses an existing folder", () => {
  const cwd = tmpDir();
  fs.mkdirSync(path.join(cwd, "taken"));
  const r = runCli(["taken", "--skip-install", "--skip-git"], cwd);
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /already exists/);
});

test("scaffolds a clean app", () => {
  const cwd = tmpDir();
  const r = runCli(["my-app", "--skip-install", "--skip-git"], cwd);
  assert.strictEqual(r.status, 0, r.stderr);
  const app = path.join(cwd, "my-app");

  const pkg = JSON.parse(fs.readFileSync(path.join(app, "package.json"), "utf8"));
  assert.strictEqual(pkg.name, "my-app");
  assert.strictEqual(pkg.private, true);
  assert.strictEqual(pkg.bin, undefined);

  for (const f of [".gitignore", ".env.example", "tsconfig.json", "src/index.tsx", "public/index.html"]) {
    assert.ok(fs.existsSync(path.join(app, f)), `missing ${f}`);
  }
  for (const f of ["gitignore", ".git", "bin", "node_modules"]) {
    assert.ok(!fs.existsSync(path.join(app, f)), `unexpected ${f}`);
  }
});
