// Generates a unique branded SVG OG image for every article at build time.
// Output: /og/[slug].svg — referenced as the og:image on each article page.
// SVG is widely supported by Google, Twitter/X, and LinkedIn.
// Note: Facebook/WhatsApp don't render SVG; upgrade to PNG via Satori if needed.

import type { APIRoute } from "astro";

const modules = import.meta.glob("../../content/articles/*.json", { eager: true });
const allArticles = Object.values(modules).map((m: any) => m.default ?? m);

export function getStaticPaths() {
  return allArticles
    .filter((a: any) => a.lang === "en") // en only — Arabic OG not needed for now
    .map((a: any) => ({ params: { slug: a.slug } }));
}

// ── Text wrapping helper ─────────────────────────────────────────────────────
function wrapText(text: string, maxChars: number, maxLines = 3): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length >= maxLines - 1) {
        // Force remaining words onto the last line (truncated if needed)
        const remaining = words.slice(words.indexOf(word)).join(" ");
        lines.push(remaining.length > maxChars + 6 ? remaining.slice(0, maxChars + 3) + "…" : remaining);
        return lines.slice(0, maxLines);
      }
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Occasion → accent color map ──────────────────────────────────────────────
const OCCASION_COLORS: Record<string, string> = {
  "wedding-guest": "#b8a06a",
  "beach-party": "#5ea8b0",
  "brunch": "#a0b87a",
  "birthday-party": "#c47a9e",
  "business-meeting": "#7a9eb8",
  "first-date": "#c47a7a",
  "job-interview": "#7a9eb8",
  "office": "#8a8eb8",
  "concert": "#9a7ab8",
  "graduation": "#b8a06a",
  "travel-day": "#7ab8a0",
  "dinner-party": "#c4a06a",
  "casual-outing": "#a0b87a",
  "eid-celebration": "#c4a06a",
  "engagement-party": "#c47a9e",
};

function getAccent(slug: string): string {
  for (const [occ, color] of Object.entries(OCCASION_COLORS)) {
    if (slug.includes(occ)) return color;
  }
  return "#caa46a"; // default gold
}

export const GET: APIRoute = ({ params }) => {
  const article = allArticles.find((a: any) => a.slug === params.slug);
  const title = article?.h1 || article?.title || "Askoutfit";
  const accent = getAccent(params.slug as string);
  const lines = wrapText(title, 34);
  const lineH = 70;
  const totalH = lines.length * lineH;
  const startY = 280 - totalH / 2;

  const textSVG = lines
    .map(
      (line, i) =>
        `<text x="80" y="${startY + i * lineH}" font-family="Georgia,'Times New Roman',serif" font-size="54" font-weight="700" fill="#f3ece2" text-anchor="start" dominant-baseline="auto">${esc(line)}</text>`
    )
    .join("\n  ");

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#1a1410"/>
  <!-- Subtle gradient overlay -->
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#221b14" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#1a1410" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <!-- Left accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="${esc(accent)}"/>
  <!-- Bottom bar -->
  <rect x="0" y="560" width="1200" height="70" fill="#100d09"/>
  <!-- Article title -->
  ${textSVG}
  <!-- Brand name -->
  <text x="80" y="610" font-family="Georgia,'Times New Roman',serif" font-size="28" font-weight="600" fill="${esc(accent)}" text-anchor="start">Askoutfit</text>
  <!-- Tagline -->
  <text x="240" y="610" font-family="Arial,sans-serif" font-size="18" fill="#6b6052" text-anchor="start">· AI Stylist · Outfit Recommendations</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
