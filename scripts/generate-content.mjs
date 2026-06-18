#!/usr/bin/env node
/**
 * Askoutfit — Content Generator (Astro edition) — TOOL USE VERSION
 * ------------------------------------------------------------
 * Uses Claude's tool-use (structured output) to GUARANTEE valid JSON,
 * even with long Arabic text. This eliminates the JSON parsing failures.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { slugify } from "./slug-util.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const KEYWORDS = path.join(ROOT, "src", "keywords.json");
const OUT_DIR = path.join(ROOT, "src", "content", "articles");
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-6";

const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg > -1 ? parseInt(process.argv[limitArg + 1], 10) : Infinity;

if (!API_KEY) {
  console.error("✗ Missing ANTHROPIC_API_KEY environment variable.");
  process.exit(1);
}


// ===== The KEY FIX: define a tool schema. =====
// When Claude calls this "tool", the API guarantees the output matches
// the schema as a proper JSON object — no manual string parsing, no
// broken quotes, works perfectly with Arabic.
const ARTICLE_TOOL = {
  name: "save_article",
  description: "Save the generated outfit guide article.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "SEO title" },
      metaDesc: { type: "string", description: "Meta description, max 155 chars" },
      h1: { type: "string", description: "Main heading" },
      introHtml: { type: "string", description: "One intro paragraph wrapped in <p> tags" },
      bodyHtml: {
        type: "string",
        description: "350-500 word body using <h2>, <p>, <ul>, <li> tags. Concrete pieces, colors, fabrics.",
      },
      faq: {
        type: "array",
        description: "3-4 FAQ items",
        items: {
          type: "object",
          properties: {
            q: { type: "string" },
            a: { type: "string" },
          },
          required: ["q", "a"],
        },
      },
      ctaTitle: { type: "string" },
      ctaSub: { type: "string" },
      ctaBtn: { type: "string" },
    },
    required: ["title", "metaDesc", "h1", "introHtml", "bodyHtml", "faq", "ctaTitle", "ctaSub", "ctaBtn"],
  },
};

async function writeArticle({ keyword, lang }) {
  const isAr = lang === "ar";
  const system =
    "You are an expert fashion editor and SEO writer for 'Askoutfit', a global brand. " +
    "Produce a helpful, specific outfit guide for the given search intent, then call the " +
    "save_article tool with the result. " +
    "IMPORTANT: Do NOT put any year (like 2024, 2025, 2026) in the title, h1, or metaDesc — " +
    "keep them evergreen and timeless. " +
    "HEADING RULES for bodyHtml: use <h2> for main sections only. For sub-sections or " +
    "numbered items under a section, use <h3> (never nest <h2> inside an <h2> section). " +
    "Maintain a clean h2 > h3 hierarchy. " +
    (isAr
      ? "Write ALL text fields in fluent, natural Arabic."
      : "Write all text fields in clear English.");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      system,
      tools: [ARTICLE_TOOL],
      tool_choice: { type: "tool", name: "save_article" }, // force the tool
      messages: [{ role: "user", content: `Search intent: "${keyword}"` }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.slice(0, 120)}`);
  }

  const data = await res.json();
  // Find the tool_use block — its `input` is already a parsed JSON object.
  const toolUse = (data.content || []).find((b) => b.type === "tool_use");
  if (!toolUse || !toolUse.input) {
    throw new Error("No tool_use block in response");
  }
  const parsed = toolUse.input;

  if (!parsed.title || !parsed.h1 || !parsed.bodyHtml) {
    throw new Error("Missing core fields (title/h1/body)");
  }
  if (!parsed.ctaTitle || !parsed.ctaBtn) {
    throw new Error("Missing CTA fields — likely truncated, will retry");
  }
  if (!Array.isArray(parsed.faq) || parsed.faq.length === 0) {
    throw new Error("Missing FAQ — likely truncated, will retry");
  }
  return parsed;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const keywords = JSON.parse(fs.readFileSync(KEYWORDS, "utf8"));
  let generated = 0,
    skipped = 0,
    failed = 0;

  for (const entry of keywords) {
    if (generated >= LIMIT) break;
    const { keyword, lang = "en", altLang, altSlug } = entry;
    const slug = slugify(keyword, lang);
    const outFile = path.join(OUT_DIR, `${slug}.json`);

    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`→ ${keyword.slice(0, 48).padEnd(48)} `);
      // Retry up to 3 times — handles truncation/transient errors.
      let article = null;
      let lastErr = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          article = await writeArticle({ keyword, lang });
          break;
        } catch (e) {
          lastErr = e;
        }
      }
      if (!article) throw lastErr;
      const record = {
        slug,
        keyword,
        lang,
        dir: lang === "ar" ? "rtl" : "ltr",
        altLang,
        altSlug,
        ...article,
        datePublished: new Date().toISOString().slice(0, 10),
      };
      fs.writeFileSync(outFile, JSON.stringify(record, null, 2), "utf8");
      generated++;
      console.log("✓");
    } catch (err) {
      failed++;
      console.log(`✗ ${err.message.slice(0, 55)}`);
    }
  }

  console.log(
    `\n✓ Done. Generated: ${generated} · Skipped (cached): ${skipped} · Failed: ${failed}`
  );
}

main();
