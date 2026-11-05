// Checks that each translation has the same shape as en.json: the same keys, the
// same list lengths, and identical values for fields that must not be translated.
// Usage: node scripts/check-translations.mjs [fr es ru ar zh]
import { readFileSync } from "node:fs";

const dir = new URL("../content/translations/", import.meta.url);
const read = (code) => JSON.parse(readFileSync(new URL(`${code}.json`, dir), "utf8"));
const en = read("en");
const codes = process.argv.slice(2).length ? process.argv.slice(2) : ["fr", "es", "ru", "ar", "zh"];

// Fields that stay exactly as they are in English.
const FIXED = new Set(["slug", "src", "href", "kind"]);
const PLACEHOLDERS = /\{[a-z]+\}/g;
let problems = 0;
const report = (code, path, message) => {
  problems += 1;
  console.log(`${code} ${path}: ${message}`);
};

function compare(code, a, b, path) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return report(code, path, "should be a list");
    if (a.length !== b.length) return report(code, path, `list has ${b.length} items, expected ${a.length}`);
    a.forEach((item, index) => compare(code, item, b[index], `${path}[${index}]`));
    return;
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object") return report(code, path, "should be an object");
    for (const key of Object.keys(a)) {
      if (!(key in b)) report(code, `${path}.${key}`, "missing");
      else compare(code, a[key], b[key], `${path}.${key}`);
    }
    for (const key of Object.keys(b)) if (!(key in a)) report(code, `${path}.${key}`, "extra key");
    return;
  }
  if (typeof a !== typeof b) return report(code, path, "wrong type");
  const key = path.split(".").pop().replace(/\[\d+\]$/, "");
  const fixed =
    FIXED.has(key) ||
    /^\.projects\[\d+\]\.name$/.test(path) ||
    /^\.projects\[1\]\.status\.text$/.test(path) ||
    /\.figures\[\d+\]\.value$/.test(path) ||
    /\.sources\[\d+\]\.title$/.test(path) ||
    /^\.projects\[\d+\]\.year$/.test(path);
  if (fixed && a !== b) report(code, path, `must stay "${a}", found "${b}"`);
  if (typeof a === "string") {
    const want = (a.match(PLACEHOLDERS) ?? []).sort().join();
    const got = (b.match(PLACEHOLDERS) ?? []).sort().join();
    if (want !== got) report(code, path, `placeholders differ: ${want} vs ${got}`);
    if (!b.trim()) report(code, path, "empty");
    if (!fixed && a.length > 24 && a === b) report(code, path, "looks untranslated");
  }
}

for (const code of codes) {
  let data;
  try {
    data = read(code);
  } catch (error) {
    report(code, "file", error.message);
    continue;
  }
  compare(code, en, data, "");
  const text = JSON.stringify(data.projects[0]);
  for (const name of ["WHO", "UNICEF", "GOARN", "IFRC", "Gates"]) {
    if (new RegExp(`\\b${name}\\b`).test(text)) report(code, "projects[0]", `names ${name}`);
  }
}
console.log(problems ? `${problems} problems` : `OK: ${codes.join(", ")}`);
process.exit(problems ? 1 : 0);
