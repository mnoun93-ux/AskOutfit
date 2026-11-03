// Dynamic sitemap.xml with hreflang for every article + homepage + category hubs + geo pages.
import geoCitiesData from "../content/geo-cities.json";
const SITE = "https://askoutfit.com";
const GEO_SEASONS = ["summer","winter","spring","fall"] as const;

const CATEGORY_SLUGS = [
  "wedding-guest-outfits",
  "brunch-outfits",
  "beach-party-outfits",
  "first-date-outfits",
  "office-outfits",
  "job-interview-outfits",
  "graduation-outfits",
  "concert-outfits",
  "birthday-party-outfits",
  "business-meeting-outfits",
  "casual-outing-outfits",
  "dinner-party-outfits",
  "eid-celebration-outfits",
  "engagement-party-outfits",
  "travel-day-outfits",
];

// Build EN↔AR article mapping directly from article content
function buildArticleHreflangMap(articles: any[]): Map<string, string> {
  const enToAr = new Map<string, string>();
  const arToEn = new Map<string, string>();
  
  for (const a of articles) {
    if (a.altSlug) {
      if (a.lang === "en") {
        enToAr.set(a.slug, a.altSlug);
      } else if (a.lang === "ar") {
        arToEn.set(a.slug, a.altSlug);
      }
    }
  }
  return { enToAr, arToEn };
}

export async function GET() {
  const modules = import.meta.glob("../content/articles/*.json", { eager: true });
  const articles = Object.values(modules).map((m: any) => m.default ?? m);
  const today = new Date().toISOString().slice(0, 10);

  // Build hreflang map from article content
  const { enToAr, arToEn } = buildArticleHreflangMap(articles);

  const urls = [
    `  <url>\n    <loc>${SITE}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>1.0</priority>\n  </url>`,

    `  <url>\n    <loc>${SITE}/articles/</loc>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/articles/"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}/articles-ar/"/>\n` +
    `    <lastmod>${today}</lastmod>\n    <priority>0.9</priority>\n  </url>`,

    `  <url>\n    <loc>${SITE}/articles-ar/</loc>\n` +
    `    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}/articles-ar/"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/articles/"/>\n` +
    `    <lastmod>${today}</lastmod>\n    <priority>0.9</priority>\n  </url>`,

    // Category hub pages
    ...CATEGORY_SLUGS.map(s =>
      `  <url>\n    <loc>${SITE}/${s}/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.85</priority>\n  </url>`
    ),

    `  <url>\n    <loc>${SITE}/privacy/</loc>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/privacy/"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}/privacy-ar/"/>\n` +
    `    <lastmod>${today}</lastmod>\n    <priority>0.3</priority>\n  </url>`,

    `  <url>\n    <loc>${SITE}/privacy-ar/</loc>\n` +
    `    <xhtml:link rel="alternate" hreflang="ar" href="${SITE}/privacy-ar/"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/privacy/"/>\n` +
    `    <lastmod>${today}</lastmod>\n    <priority>0.3</priority>\n  </url>`,

    // About page
    `  <url>\n    <loc>${SITE}/about/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.5</priority>\n  </url>`,

    // Travel guides index
    `  <url>\n    <loc>${SITE}/travel-guides/</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.9</priority>\n  </url>`,

    // Geo pSEO pages English + Arabic (currently {cities}×4 seasons×2 langs — count reflects geo-cities.json) with hreflang
    ...(geoCitiesData as any[]).flatMap((city: any) =>
      GEO_SEASONS.flatMap(season => {
        const enLoc = `${SITE}/what-to-wear-in-${city.id}-${season}/`;
        const arLoc = `${SITE}/ar/what-to-wear-in-${city.id}-${season}/`;
        return [
          `  <url>\n    <loc>${enLoc}</loc>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="ar" href="${arLoc}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>\n` +
          `    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>`,
          `  <url>\n    <loc>${arLoc}</loc>\n` +
          `    <xhtml:link rel="alternate" hreflang="ar" href="${arLoc}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>\n` +
          `    <lastmod>${today}</lastmod>\n    <priority>0.7</priority>\n  </url>`,
        ];
      })
    ),

    // Articles: use verified EN↔AR mapping for proper hreflang
    ...articles.map((a: any) => {
      const loc = `${SITE}/${a.slug}/`;
      let hreflangLinks = `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${loc}"/>\n`;
      
      if (a.lang === "en") {
        const arSlug = enToAr.get(a.slug);
        if (arSlug) {
          const otherLoc = `${SITE}/${arSlug}/`;
          hreflangLinks += `    <xhtml:link rel="alternate" hreflang="ar" href="${otherLoc}"/>\n`;
        }
      } else if (a.lang === "ar") {
        const enSlug = arToEn.get(a.slug);
        if (enSlug) {
          const otherLoc = `${SITE}/${enSlug}/`;
          hreflangLinks += `    <xhtml:link rel="alternate" hreflang="en" href="${otherLoc}"/>\n`;
        }
      }
      
      hreflangLinks += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>\n`;
      return (
        `  <url>\n    <loc>${loc}</loc>\n` +
        hreflangLinks +
        `    <lastmod>${a.datePublished || today}</lastmod>\n  </url>`
      );
    }),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
