import { useState, useRef, useEffect } from "react";
import {
  Sparkles, ArrowRight, Loader2, Shirt, Footprints, Watch,
  RefreshCw, Wand2, Globe, Zap, Heart,
} from "lucide-react";

// ============================================================
// Askoutfit — Home Page (hero = the tool itself)
// Editorial / stylist lookbook direction. The tool is the hero.
// Self-contained React component. GA4 events wired throughout.
// ============================================================

// ============================================================
// API ENDPOINT
// ------------------------------------------------------------
// Local dev: calls Anthropic directly (fine for testing).
// Production: set this to your Cloudflare Worker URL so your API
// key stays hidden server-side. Replace the production URL below.
// ============================================================
const API_ENDPOINT =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "https://api.anthropic.com/v1/messages"
    : "https://askoutfit-proxy.YOUR-SUBDOMAIN.workers.dev"; // <-- ضع رابط الـ Worker بعد نشره


// ------------------------------------------------------------
// Stage 1 (NOW): Amazon search links carrying your associate tag.
//   - Works immediately, no API approval needed.
//   - Just replace YOUR_TAG below with your real Associates tag.
// Stage 2 (after 10 qualifying sales / 30 days): switch to Amazon
//   Creators API (replaced PA-API 5.0 on May 15, 2026; OAuth2) to
//   show real product images + prices. Only this function changes.
// Note: UAE (AE) is in Amazon's EU region — register accordingly.
// ============================================================
const AMAZON_ASSOC_TAG = "YOUR_TAG-20"; // <-- ضع تاج الأفلييت الحقيقي من Amazon Associates
const AMAZON_DOMAIN = "www.amazon.com";  // عالمي: amazon.com هو الأوسع شحناً دولياً
function buildAffiliateLink(searchTerm) {
  return `https://${AMAZON_DOMAIN}/s?k=${encodeURIComponent(searchTerm)}&tag=${AMAZON_ASSOC_TAG}`;
}
function track(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}

const SLOT_META = {
  top: { en: "Top", ar: "الأعلى", Icon: Shirt },
  bottom: { en: "Bottom", ar: "الأسفل", Icon: Shirt },
  outerwear: { en: "Outerwear", ar: "الطبقة الخارجية", Icon: Shirt },
  shoes: { en: "Shoes", ar: "الحذاء", Icon: Footprints },
  accessory: { en: "Accessory", ar: "الإكسسوار", Icon: Watch },
};

const EXAMPLES = {
  en: [
    "Summer outdoor wedding, men",
    "First date dinner, smart casual",
    "Winter job interview, women",
    "Beach party, relaxed",
  ],
  ar: [
    "حفل زفاف صيفي خارجي، رجال",
    "أول موعد عشاء، كاجوال أنيق",
    "مقابلة عمل شتوية، نساء",
    "حفلة شاطئ، مريح",
  ],
};

const STEPS = {
  en: [
    { Icon: Wand2, t: "Describe the moment", d: "Tell us the occasion, the season, the vibe — a sentence is enough." },
    { Icon: Sparkles, t: "Get a full look", d: "A complete outfit, head to toe, chosen to actually work together." },
    { Icon: Heart, t: "Shop what you love", d: "Every piece links to where you can buy it. No guesswork." },
  ],
  ar: [
    { Icon: Wand2, t: "صِف اللحظة", d: "أخبرنا بالمناسبة والموسم والأجواء — جملة واحدة تكفي." },
    { Icon: Sparkles, t: "احصل على إطلالة كاملة", d: "تنسيق متكامل من الرأس للقدم، مختار ليتناسق فعلاً." },
    { Icon: Heart, t: "تسوّق ما يعجبك", d: "كل قطعة مرتبطة بمكان شرائها. دون تخمين." },
  ],
};

// Curated internal-link topics (feed SEO; these map to your blog landing pages)
const TOPICS = {
  en: [
    "What to wear to a summer wedding",
    "First date outfit ideas",
    "Job interview looks that land",
    "Winter travel, packed light",
    "Beach party, done right",
    "Smart casual, decoded",
  ],
  ar: [
    "ماذا تلبس في حفل زفاف صيفي",
    "أفكار ملابس أول موعد",
    "إطلالات مقابلات العمل",
    "سفر الشتاء بحقيبة خفيفة",
    "حفلة الشاطئ بإتقان",
    "الكاجوال الأنيق ببساطة",
  ],
};

export default function AskoutfitHome() {
  const [lang, setLang] = useState("en");
  const [gender, setGender] = useState(""); // "", "men", "women"
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const toolRef = useRef(null);
  const ar = lang === "ar";
  const dir = ar ? "rtl" : "ltr";

  async function generate(q) {
    const text = (q ?? query).trim();
    if (!text) return;
    const arabic = isArabic(text);
    if (arabic !== ar) setLang(arabic ? "ar" : "en");
    setLoading(true);
    setError("");
    setResult(null);
    track("outfit_request", { query: text, lang: arabic ? "ar" : "en", gender: gender || "unspecified" });

    const genderLine = gender
      ? `The outfit is for ${gender}. `
      : "";
    const system =
      "You are a professional fashion stylist. Given a situation, return ONE complete, tasteful outfit. " +
      genderLine +
      "Respond ONLY with valid JSON, no markdown, no backticks, no preamble. " +
      'Schema: {"intro": string, "items": [{"slot": one of [top,bottom,outerwear,shoes,accessory], "name": string, "search": string, "why": string}], "note": string}. ' +
      "The 'search' is a concrete shoppable English phrase (e.g. 'navy linen blazer men slim fit'). " +
      "Include 3-5 items covering at least top, bottom/dress, and shoes. " +
      (arabic
        ? "Write intro, name, why, note in Arabic. Keep 'search' in ENGLISH."
        : "Write everything in English.");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system,
          messages: [{ role: "user", content: text }],
        }),
      });
      const data = await response.json();
      const raw = (data.content || [])
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("")
        .replace(/```json|```/g, "")
        .trim();
      const parsed = JSON.parse(raw);
      setResult(parsed);
      track("outfit_generated", { lang: arabic ? "ar" : "en", items: parsed.items?.length || 0, gender: gender || "unspecified" });
    } catch (err) {
      console.error(err);
      setError(arabic ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function scrollToTool() {
    toolRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => inputRef.current?.focus(), 400);
  }

  return (
    <div
      dir={dir}
      style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Inter', system-ui, sans-serif" }}
      className="min-h-screen w-full bg-[#1a1410] text-[#f3ece2]"
    >
      {/* ===== Top bar ===== */}
      <nav className="sticky top-0 z-20 border-b border-[#3a3026]/60 bg-[#1a1410]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xl font-semibold tracking-tight"
          >
            Askoutfit
          </span>
          <button
            onClick={() => {
              const next = ar ? "en" : "ar";
              setLang(next);
              track("lang_toggle", { to: next });
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#3a3026] px-3 py-1.5 text-xs text-[#b9ad9b] transition hover:border-[#caa46a]/50 hover:text-[#f3ece2]"
          >
            <Globe size={13} />
            {ar ? "English" : "العربية"}
          </button>
        </div>
      </nav>

      {/* ===== Hero = the tool ===== */}
      <header className="relative overflow-hidden">
        {/* ambient gradient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(202,164,106,0.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 pt-14 pb-8 text-center sm:pt-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#caa46a]/30 bg-[#caa46a]/10 px-3 py-1 text-xs tracking-wide text-[#caa46a]">
            <Sparkles size={13} />
            {ar ? "مُنسّق أزياء بالذكاء الاصطناعي" : "Your AI stylist"}
          </div>
          <h1
            style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Playfair Display', Georgia, serif" }}
            className="text-[2.6rem] font-semibold leading-[1.08] sm:text-6xl"
          >
            {ar ? "ماذا ألبس اليوم؟" : "What should I wear?"}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#b9ad9b] sm:text-lg">
            {ar
              ? "صِف المناسبة بجملة، واحصل على تنسيق كامل قابل للشراء في ثوانٍ."
              : "Describe the occasion in a sentence. Get a complete, shoppable outfit in seconds."}
          </p>
        </div>

        {/* Tool card */}
        <div ref={toolRef} className="relative mx-auto max-w-2xl px-5 pb-16 scroll-mt-24">
          <div className="rounded-2xl border border-[#3a3026] bg-[#221b14] p-4 shadow-2xl">
            {/* Gender selector */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs text-[#6b6052]">{ar ? "التنسيق لـ:" : "Styling for:"}</span>
              {[
                { key: "women", en: "Women", ar: "نساء" },
                { key: "men", en: "Men", ar: "رجال" },
              ].map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    const next = gender === g.key ? "" : g.key;
                    setGender(next);
                    track("gender_select", { gender: next || "unspecified" });
                  }}
                  aria-pressed={gender === g.key}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    gender === g.key
                      ? "bg-[#caa46a] text-[#1a1410]"
                      : "border border-[#3a3026] text-[#b9ad9b] hover:border-[#caa46a]/50 hover:text-[#f3ece2]"
                  }`}
                >
                  {ar ? g.ar : g.en}
                </button>
              ))}
            </div>
            <textarea
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate();
              }}
              rows={3}
              placeholder={ar ? "مثال: حفل زفاف صيفي خارجي، رجال..." : "e.g. Summer outdoor wedding, men..."}
              className="w-full resize-none bg-transparent text-base text-[#f3ece2] placeholder-[#6b6052] outline-none"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-[#6b6052]">
                {ar ? "بالعربية أو الإنجليزية" : "English or Arabic"}
              </span>
              <button
                onClick={() => generate()}
                disabled={loading || !query.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-[#caa46a] px-5 py-2.5 text-sm font-medium text-[#1a1410] transition hover:bg-[#d8b67e] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} className={ar ? "rotate-180" : ""} />}
                {ar ? "أنشئ التنسيق" : "Style me"}
              </button>
            </div>
          </div>

          {/* Examples */}
          {!result && !loading && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {EXAMPLES[lang].map((ex) => (
                <button
                  key={ex}
                  onClick={() => { setQuery(ex); generate(ex); }}
                  className="rounded-full border border-[#3a3026] px-3 py-1.5 text-xs text-[#b9ad9b] transition hover:border-[#caa46a]/50 hover:text-[#f3ece2]"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-6 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[68px] animate-pulse rounded-xl border border-[#3a3026] bg-[#221b14]" />
              ))}
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="mt-6">
              {result.intro && <p className="mb-4 text-center text-lg">{result.intro}</p>}
              <div className="space-y-3">
                {result.items?.map((item, i) => {
                  const meta = SLOT_META[item.slot] || SLOT_META.accessory;
                  const Icon = meta.Icon;
                  return (
                    <a
                      key={i}
                      href={buildAffiliateLink(item.search)}
                      target="_blank"
                      rel="noopener nofollow sponsored"
                      onClick={() => track("affiliate_click", { item: item.search, slot: item.slot, lang })}
                      className="group flex items-center gap-4 rounded-xl border border-[#3a3026] bg-[#221b14] p-4 transition hover:border-[#caa46a]/50 hover:bg-[#271f17]"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#caa46a]/12 text-[#caa46a]">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#6b6052]">
                          {meta[lang]}
                        </span>
                        <p className="truncate font-medium">{item.name}</p>
                        {item.why && <p className="truncate text-xs text-[#b9ad9b]">{item.why}</p>}
                      </div>
                      <ArrowRight size={16} className={`flex-shrink-0 text-[#6b6052] transition group-hover:text-[#caa46a] ${ar ? "rotate-180" : ""}`} />
                    </a>
                  );
                })}
              </div>
              {result.note && (
                <p className="mt-4 rounded-xl border border-[#3a3026] bg-[#221b14]/50 px-4 py-3 text-sm text-[#b9ad9b]">
                  💡 {result.note}
                </p>
              )}
              <button
                onClick={() => { setResult(null); setQuery(""); inputRef.current?.focus(); }}
                className="mx-auto mt-5 flex items-center gap-2 text-sm text-[#caa46a] hover:underline"
              >
                <RefreshCw size={14} />
                {ar ? "جرّب تنسيقاً آخر" : "Try another outfit"}
              </button>
              <p className="mt-5 text-center text-[10px] text-[#6b6052]">
                {ar
                  ? "قد نربح عمولة على عمليات الشراء عبر الروابط، دون أي تكلفة إضافية عليك."
                  : "We may earn a commission on purchases through links, at no extra cost to you."}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* ===== How it works ===== */}
      <section className="border-t border-[#3a3026]/60 bg-[#1d1610]">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h2
            style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Playfair Display', serif" }}
            className="text-center text-2xl font-semibold sm:text-3xl"
          >
            {ar ? "ثلاث خطوات، إطلالة كاملة" : "Three steps, one complete look"}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS[lang].map((s, i) => (
              <div key={i} className="rounded-2xl border border-[#3a3026] bg-[#221b14] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#caa46a]/12 text-[#caa46a]">
                  <s.Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-[#b9ad9b]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Popular topics (internal links -> blog landing pages) ===== */}
      <section className="border-t border-[#3a3026]/60">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-8 flex items-center gap-2">
            <Zap size={18} className="text-[#caa46a]" />
            <h2
              style={{ fontFamily: ar ? "'Tajawal', sans-serif" : "'Playfair Display', serif" }}
              className="text-2xl font-semibold sm:text-3xl"
            >
              {ar ? "وجهات شائعة" : "Popular looks"}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS[lang].map((topic) => (
              <a
                key={topic}
                href="#"
                onClick={() => track("topic_click", { topic, lang })}
                className="group flex items-center justify-between rounded-xl border border-[#3a3026] bg-[#221b14] px-5 py-4 transition hover:border-[#caa46a]/50 hover:bg-[#271f17]"
              >
                <span className="text-sm font-medium">{topic}</span>
                <ArrowRight size={15} className={`text-[#6b6052] transition group-hover:text-[#caa46a] ${ar ? "rotate-180" : ""}`} />
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={scrollToTool}
              className="inline-flex items-center gap-2 rounded-xl bg-[#caa46a] px-6 py-3 text-sm font-medium text-[#1a1410] transition hover:bg-[#d8b67e]"
            >
              <Sparkles size={16} />
              {ar ? "أنشئ إطلالتك الآن" : "Style your look now"}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#3a3026]/60 bg-[#1d1610]">
        <div className="mx-auto max-w-5xl px-5 py-10 text-center text-xs text-[#6b6052]">
          <p
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="mb-3 text-base text-[#b9ad9b]"
          >
            Askoutfit
          </p>
          <p>
            {ar
              ? "قد نربح عمولة على عمليات الشراء عبر الروابط. © "
              : "We may earn a commission on purchases through links. © "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
