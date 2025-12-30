#!/usr/bin/env bun

import { $ } from "bun";
import path from "path";
import fs from "fs";

import pkg from "../package.json";
import { getTargetName, targetpackageName, targets } from "./bunup-builds";
import { buildTargets } from "./build";

const dir = path.resolve(import.meta.dir, "..");
$.cwd(dir);

const args = Bun.argv.slice(2);
const dryRun = args.includes("--dry-run");
const mainOnly = args.includes("--main-only");
const platformVersion = getFlagValue(args, "--platform-version");
const versionArg = args.find((arg, index) => {
  if (arg.startsWith("--")) return false;
  if (args[index - 1] === "--platform-version") return false;
  return true;
});
// Append a prerelease suffix during dry runs to avoid "already published" errors
const version = dryRun && versionArg ? `${versionArg}-dry-run.${Date.now()}` : versionArg;

if (!version) {
  console.error(
    "Usage: bun run scripts/publish.ts <version> [--dry-run] [--main-only --platform-version <version>]"
  );
  process.exit(1);
}

if (mainOnly && !platformVersion) {
  console.error("Missing --platform-version <version> when using --main-only");
  process.exit(1);
}

async function isPublished(name: string, targetVersion: string) {
  try {
    const output = await $`npm view ${name} version`.text();
    return output.trim() === targetVersion;
  } catch {
    return false;
  }
}

console.log(`\n🚀 Publishing ${pkg.name} v${version}${dryRun ? " (DRY RUN)" : ""}\n`);
console.log("─".repeat(50));

if (dryRun) {
  console.log("⚠️  Dry run mode: no packages will be published to npm\n");
}

function buildBinariesMap(versionForBinaries: string): Record<string, string> {
  const binaries: Record<string, string> = {};
  for (const item of targets) {
    const name = getTargetName(item);
    const pkgName = name.replace(targetpackageName, pkg.name);
    binaries[pkgName] = versionForBinaries;
  }
  return binaries;
}

const binaries = mainOnly ? buildBinariesMap(platformVersion!) : await buildTargets(version);

if (!mainOnly) {
  // Smoke test on current platform
  const currentPlatform = process.platform === "win32" ? "windows" : process.platform;
  const currentArch = process.arch;
  const currentPackage = `${targetpackageName}-${currentPlatform}-${currentArch}`;
  const binaryExt = process.platform === "win32" ? ".exe" : "";
  const binaryPath = `./dist/${currentPackage}/bin/${targetpackageName}${binaryExt}`;

  if (fs.existsSync(binaryPath)) {
    console.log(`\n🧪 Running smoke test: ${binaryPath} --version`);
    try {
      await $`${binaryPath} --version`;
      console.log("   ✅ Smoke test passed");
    } catch (error) {
      console.error("   ❌ Smoke test failed:", error);
      process.exit(1);
    }
  } else {
    console.log(`\n⚠️  Skipping smoke test (no binary for current platform: ${currentPackage})`);
  }
}

// Prepare main package
console.log("\n📁 Preparing main package...");

await $`mkdir -p ./dist/${targetpackageName}/bin`;
await $`mkdir -p ./dist/${targetpackageName}/assets`;
await $`cp -r ./bin ./dist/${targetpackageName}/`;
await $`cp scripts/postinstall.mjs dist/${targetpackageName}/postinstall.mjs`;
await $`cp README.md dist/${targetpackageName}/README.md`;
await $`cp LICENSE dist/${targetpackageName}/LICENSE`;
await $`cp THIRD_PARTY_NOTICES.md dist/${targetpackageName}/THIRD_PARTY_NOTICES.md`;
await $`mkdir -p ./dist/${targetpackageName}/LICENSES`;
await $`cp LICENSES/IBM-Plex-Mono-OFL.txt dist/${targetpackageName}/LICENSES/IBM-Plex-Mono-OFL.txt`;
await $`cp -r assets/images dist/${targetpackageName}/assets/`;

await Bun.file(`./dist/${targetpackageName}/package.json`).write(
  JSON.stringify(
    {
      name: pkg.name,
      version,
      description: pkg.description,
      bin: `bin/${targetpackageName}`,
      scripts: { postinstall: "node ./postinstall.mjs" },
      optionalDependencies: binaries,
      repository: pkg.repository,
      homepage: pkg.homepage,
      bugs: pkg.bugs,
      keywords: pkg.keywords,
      author: pkg.author,
      license: pkg.license,
      // engines: pkg.engines,
    },
    null,
    2
  )
);

console.log("✅ Main package prepared");

// Publish platform packages
if (mainOnly) {
  console.log("\n⏭️  Skipping platform packages (--main-only)");
} else {
  console.log("\n📤 Publishing platform packages...");

  for (const [name] of Object.entries(binaries)) {
    const targetPath = path.join(dir, "dist", name.replace(pkg.name, targetpackageName));

    if (process.platform !== "win32") {
      await $`chmod -R 755 .`.cwd(targetPath);
    }

    await $`mkdir -p ${path.join(targetPath, "assets")}`;
    await $`cp -r assets/images ${path.join(targetPath, "assets/")}`;
    await $`cp LICENSE ${path.join(targetPath, "LICENSE")}`;
    await $`cp THIRD_PARTY_NOTICES.md ${path.join(targetPath, "THIRD_PARTY_NOTICES.md")}`;
    await $`mkdir -p ${path.join(targetPath, "LICENSES")}`;
    await $`cp LICENSES/IBM-Plex-Mono-OFL.txt ${path.join(targetPath, "LICENSES/IBM-Plex-Mono-OFL.txt")}`;

    if (dryRun) {
      await $`npm publish --access public --dry-run --tag dry-run`.cwd(targetPath);
      console.log(`✅ Would publish ${name}`);
    } else if (await isPublished(name, version)) {
      console.log(`⏭️  Skipping ${name} (already published)`);
    } else {
      await $`npm publish --access public`.cwd(targetPath);
      console.log(`✅ Published ${name}`);
    }
  }
}

// Publish main package
console.log("\n📤 Publishing main package...");

const mainPackagePath = path.join(dir, "dist", targetpackageName);
if (dryRun) {
  await $`npm publish --access public --dry-run --tag dry-run`.cwd(mainPackagePath);
  console.log(`✅ Would publish ${pkg.name}`);
} else if (await isPublished(pkg.name, version)) {
  console.log(`⏭️  Skipping ${pkg.name} (already published)`);
} else {
  await $`npm publish --access public`.cwd(mainPackagePath);
  console.log(`✅ Published ${pkg.name}`);
}

// Summary
console.log(`\n${"─".repeat(50)}`);
console.log(`\n✅ ${dryRun ? "Dry run" : "Publish"} complete!\n`);
console.log(`Version: ${version}`);
console.log(`Packages: ${Object.keys(binaries).length + 1}`);

function getFlagValue(inputArgs: string[], flag: string): string | undefined {
  const index = inputArgs.indexOf(flag);
  if (index === -1) return undefined;
  const value = inputArgs[index + 1];
  if (!value || value.startsWith("--")) return undefined;
  return value;
}
