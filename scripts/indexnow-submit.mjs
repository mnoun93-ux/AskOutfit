// Submits every URL in sitemap.xml to IndexNow (Bing + Yandex) in one request.
// Usage: node scripts/indexnow-submit.mjs
//
// Requires the key file to already be live at:
//   https://askoutfit.com/8dfbad6414d849f9b6ac81b2e358dbb6.txt
// (deployed via `public/8dfbad6414d849f9b6ac81b2e358dbb6.txt`)

const HOST = "askoutfit.com";
const KEY = "8dfbad6414d849f9b6ac81b2e358dbb6";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function main() {
  console.log(`Fetching ${SITEMAP_URL} ...`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  // Extract every <loc>...</loc> value.
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  const uniqueUrls = [...new Set(urls)];

  console.log(`Found ${uniqueUrls.length} URLs in sitemap.`);

  if (uniqueUrls.length === 0) {
    console.error("No URLs found — aborting.");
    process.exit(1);
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls,
  };

  console.log("Submitting to IndexNow (api.indexnow.org) ...");
  const submitRes = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  console.log(`Response status: ${submitRes.status} ${submitRes.statusText}`);
  const text = await submitRes.text();
  if (text) console.log("Response body:", text);

  if (submitRes.status === 200 || submitRes.status === 202) {
    console.log(`\n✅ Successfully submitted ${uniqueUrls.length} URLs to IndexNow.`);
  } else {
    console.error("\n⚠️  Submission may have failed — check the status code above against the IndexNow docs.");
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
