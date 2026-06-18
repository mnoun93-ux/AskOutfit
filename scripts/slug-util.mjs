/**
 * Askoutfit — Shared slug utility
 * ------------------------------------------------------------
 * Produces clean, Latin-only, URL-safe slugs for BOTH languages.
 * Arabic is transliterated to Latin so URLs work everywhere
 * (no %D8%A7 mess), deploy cleanly, and read well for global SEO.
 * The article CONTENT stays fully Arabic — only the URL is Latin.
 */

// Arabic -> Latin character map (covers letters, common diacritics removed).
const AR_MAP = {
  "ا": "a", "أ": "a", "إ": "e", "آ": "aa", "ء": "", "ئ": "e", "ؤ": "o",
  "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "h", "خ": "kh",
  "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh",
  "ص": "s", "ض": "d", "ط": "t", "ظ": "z", "ع": "a", "غ": "gh",
  "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m", "ن": "n",
  "ه": "h", "و": "w", "ي": "y", "ى": "a", "ة": "a",
  // diacritics (tashkeel) -> drop
  "\u064B": "", "\u064C": "", "\u064D": "", "\u064E": "", "\u064F": "",
  "\u0650": "", "\u0651": "", "\u0652": "", "\u0653": "", "\u0640": "",
  // arabic-indic digits
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

function transliterateArabic(text) {
  let out = "";
  for (const ch of String(text)) {
    if (AR_MAP[ch] !== undefined) out += AR_MAP[ch];
    else out += ch; // keep latin letters/spaces/digits as-is
  }
  return out;
}

/**
 * slugify — always returns a clean Latin, lowercase, hyphenated slug.
 * @param {string} input  the phrase
 * @param {string} lang   "ar" | "en"
 */
export function slugify(input, lang) {
  let s = String(input).trim();
  if (lang === "ar") s = transliterateArabic(s);
  s = s.toLowerCase();
  s = s.replace(/[\/\\]+/g, "-"); // slashes -> hyphen
  s = s.replace(/[^a-z0-9\s-]/g, ""); // keep only latin/digits/space/hyphen
  s = s.replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s;
}
