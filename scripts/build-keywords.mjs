#!/usr/bin/env node
/**
 * Askoutfit — Keyword Matrix Generator
 * ------------------------------------------------------------
 * Builds hundreds of long-tail, bilingual search intents by combining
 * occasions × audience × season × style, then pairs EN<->AR via hreflang.
 *
 * Run:  node build-keywords.js   ->  writes keywords.json
 *
 * Strategy: long-tail = low competition + high purchase intent.
 * The Arabic side is your moat (under-served market).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { slugify } from "./slug-util.mjs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===== Dimensions =====
// Each item: { en, ar }. Combined into natural phrases below.
const OCCASIONS = [
  { en: "wedding guest", ar: "حفل زفاف" },
  { en: "job interview", ar: "مقابلة عمل" },
  { en: "first date", ar: "أول موعد" },
  { en: "beach party", ar: "حفلة شاطئ" },
  { en: "graduation", ar: "حفل تخرج" },
  { en: "business meeting", ar: "اجتماع عمل" },
  { en: "dinner party", ar: "حفل عشاء" },
  { en: "birthday party", ar: "حفلة عيد ميلاد" },
  { en: "brunch", ar: "بطون نهاري" },
  { en: "concert", ar: "حفلة موسيقية" },
  { en: "travel day", ar: "يوم سفر" },
  { en: "office", ar: "المكتب" },
  { en: "Eid celebration", ar: "احتفال العيد" },
  { en: "engagement party", ar: "حفلة خطوبة" },
  { en: "casual outing", ar: "خروجة كاجوال" },
];

const AUDIENCE = [
  { en: "men", ar: "للرجال", key: "m" },
  { en: "women", ar: "للنساء", key: "w" },
];

const SEASON = [
  { en: "summer", ar: "صيفي" },
  { en: "winter", ar: "شتوي" },
  { en: "spring", ar: "ربيعي" },
  { en: "autumn", ar: "خريفي" },
];

const STYLE = [
  { en: "smart casual", ar: "كاجوال أنيق" },
  { en: "formal", ar: "رسمي" },
  { en: "elegant", ar: "أنيق" },
  { en: "relaxed", ar: "مريح" },
];

// ===== Phrase builders =====
// We don't multiply ALL dimensions (that explodes to thousands of thin pages).
// Instead we build 3 high-value templates, each picking a sensible subset.
function buildEN({ occ, aud, sea, sty }) {
  // e.g. "summer wedding guest outfit for men"
  if (sea && sty) return `${sea.en} ${occ.en} outfit ${aud.en} ${sty.en}`;
  if (sea) return `${sea.en} ${occ.en} outfit for ${aud.en}`;
  if (sty) return `${occ.en} outfit ${aud.en} ${sty.en}`;
  return `what to wear to a ${occ.en} ${aud.en}`;
}
function buildAR({ occ, aud, sea, sty }) {
  // e.g. "ملابس حفل زفاف صيفي للرجال كاجوال أنيق"
  if (sea && sty) return `ملابس ${occ.ar} ${sea.ar} ${aud.ar} ${sty.ar}`;
  if (sea) return `ملابس ${occ.ar} ${sea.ar} ${aud.ar}`;
  if (sty) return `ملابس ${occ.ar} ${aud.ar} ${sty.ar}`;
  return `ماذا تلبس في ${occ.ar} ${aud.ar}`;
}

// ===== Generate =====
const seen = new Set();
const out = [];

function push(en, ar) {
  const enSlug = slugify(en, "en");
  const arSlug = slugify(ar, "ar");
  if (seen.has(enSlug)) return;
  seen.add(enSlug);
  out.push({ keyword: en, lang: "en", altLang: "ar", altSlug: arSlug });
  out.push({ keyword: ar, lang: "ar", altLang: "en", altSlug: enSlug });
}

for (const occ of OCCASIONS) {
  for (const aud of AUDIENCE) {
    // Template A: occasion + audience + season  (seasonal intent)
    for (const sea of SEASON) {
      push(buildEN({ occ, aud, sea }), buildAR({ occ, aud, sea }));
    }
    // Template B: occasion + audience + style  (style intent)
    for (const sty of STYLE) {
      push(buildEN({ occ, aud, sty }), buildAR({ occ, aud, sty }));
    }
    // Template C: plain "what to wear" question intent
    push(buildEN({ occ, aud }), buildAR({ occ, aud }));
  }
}

fs.writeFileSync(
  path.join(__dirname, "..", "src", "keywords.json"),
  JSON.stringify(out, null, 2),
  "utf8"
);

const pairs = out.length / 2;
console.log(`✓ Built ${out.length} entries (${pairs} bilingual pairs) -> keywords.json`);
console.log(`  Occasions: ${OCCASIONS.length} · Audience: ${AUDIENCE.length} · Season: ${SEASON.length} · Style: ${STYLE.length}`);
console.log(`\n  Sample:`);
out.slice(0, 6).forEach((o) => console.log(`   [${o.lang}] ${o.keyword}`));
