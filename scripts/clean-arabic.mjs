#!/usr/bin/env node
/**
 * Askoutfit — Clean Arabic Articles (safe)
 * ------------------------------------------------------------
 * Deletes ONLY Arabic article JSON files (by reading each file's
 * "lang" field === "ar"), leaving English ones untouched.
 * Reads the lang field rather than guessing from the filename, so
 * it is precise and safe.
 *
 * Run:  node scripts/clean-arabic.mjs           (preview only)
 *       node scripts/clean-arabic.mjs --delete  (actually delete)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "src", "content", "articles");
const DO_DELETE = process.argv.includes("--delete");

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
let ar = 0,
  en = 0,
  bad = 0;

for (const f of files) {
  const full = path.join(DIR, f);
  try {
    const data = JSON.parse(fs.readFileSync(full, "utf8"));
    if (data.lang === "ar") {
      ar++;
      if (DO_DELETE) {
        fs.unlinkSync(full);
        console.log(`🗑  deleted: ${f}`);
      } else {
        console.log(`would delete: ${f}`);
      }
    } else {
      en++;
    }
  } catch {
    bad++;
    console.log(`⚠  unreadable (skipped): ${f}`);
  }
}

console.log(
  `\nArabic: ${ar} · English kept: ${en} · Unreadable: ${bad}`
);
if (!DO_DELETE) {
  console.log(`\nPreview only. Run again with --delete to actually remove them:`);
  console.log(`  node scripts/clean-arabic.mjs --delete`);
} else {
  console.log(`\n✓ Done. Now regenerate: npm run build:content`);
}
