import { useState, useRef, useEffect } from "react";
import {
  Sparkles, ArrowRight, Loader2, Shirt, Footprints, Watch,
  RefreshCw, Wand2, Globe, Zap, Heart,
} from "lucide-react";

// ============================================================
// Askoutfit — Home Page (hero = the tool itself)
// Styling is PLAIN CSS (scoped <style> below) — no Tailwind dependency,
// so it renders identically on any environment.
// ============================================================

const API_ENDPOINT =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "https://api.anthropic.com/v1/messages"
    : "https://askoutfit-proxy.askoutfit.workers.dev";

const AMAZON_ASSOC_TAG = "askoutfit-20"; // تاج الأفلييت
const AMAZON_DOMAIN = "www.amazon.com";  // عالمي
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
  en: ["Summer outdoor wedding, men", "First date dinner, smart casual", "Winter job interview, women", "Beach party, relaxed"],
  ar: ["حفل زفاف صيفي خارجي، رجال", "أول موعد عشاء، كاجوال أنيق", "مقابلة عمل شتوية، نساء", "حفلة شاطئ، مريح"],
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

const HUBS = [
  { slug: "wedding-guest-outfits",  en: "Wedding Guest", ar: "أزياء الأفراح",   emoji: "💍" },
  { slug: "first-date-outfits",     en: "First Date",    ar: "أول موعد",         emoji: "✨" },
  { slug: "brunch-outfits",         en: "Brunch",        ar: "البرانش",          emoji: "☕" },
  { slug: "beach-party-outfits",    en: "Beach Party",   ar: "حفلة الشاطئ",     emoji: "🏖" },
  { slug: "office-outfits",         en: "Office",        ar: "المكتب",           emoji: "💼" },
  { slug: "job-interview-outfits",  en: "Job Interview", ar: "مقابلة العمل",    emoji: "🎯" },
  { slug: "graduation-outfits",     en: "Graduation",    ar: "التخرج",           emoji: "🎓" },
  { slug: "concert-outfits",        en: "Concert",       ar: "الحفلات",          emoji: "🎵" },
];

const TOPICS = {
  en: [
    { label: "What to wear to a summer wedding", href: "/summer-wedding-guest-outfit-for-men/" },
    { label: "First date outfit ideas", href: "/summer-first-date-outfit-for-men/" },
    { label: "Job interview looks that land", href: "/summer-job-interview-outfit-for-men/" },
    { label: "Winter travel, packed light", href: "/winter-travel-day-outfit-for-men/" },
    { label: "Beach party, done right", href: "/summer-beach-party-outfit-for-men/" },
    { label: "Smart casual, decoded", href: "/wedding-guest-outfit-men-smart-casual/" },
  ],
  ar: [
    { label: "ماذا تلبس في حفل زفاف صيفي", href: "/mlabs-hfl-zfaf-syfy-llrjal/" },
    { label: "أفكار ملابس أول موعد", href: "/mlabs-awl-mwad-syfy-llrjal/" },
    { label: "إطلالات مقابلات العمل", href: "/mlabs-mqabla-aml-syfy-llrjal/" },
    { label: "سفر الشتاء بحقيبة خفيفة", href: "/mlabs-ywm-sfr-shtwy-llrjal/" },
    { label: "حفلة الشاطئ بإتقان", href: "/mlabs-hfla-shate-syfy-llrjal/" },
    { label: "الكاجوال الأنيق ببساطة", href: "/mlabs-hfl-zfaf-llrjal-kajwal-anyq/" },
  ],
};

export default function AskoutfitHome() {
  const [lang, setLang] = useState("en");
  const [gender, setGender] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const toolRef = useRef(null);
  const ar = lang === "ar";
  const dir = ar ? "rtl" : "ltr";

  // إذا قدم الزائر من مقالة عربية (?lang=ar)، فعّل العربية تلقائياً
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("lang") === "ar") setLang("ar");
    }
  }, []);

  async function generate(q) {
    const text = (q ?? query).trim();
    if (!text) return;
    const arabic = isArabic(text);
    if (arabic !== ar) setLang(arabic ? "ar" : "en");
    setLoading(true);
    setError("");
    setResult(null);
    track("outfit_request", { query: text, lang: arabic ? "ar" : "en", gender: gender || "unspecified" });

    const genderLine = gender ? `The outfit is for ${gender}. ` : "";
    const system =
      "You are a professional fashion stylist. Given a situation, return ONE complete, tasteful outfit. " +
      genderLine +
      "Respond ONLY with valid JSON, no markdown, no backticks, no preamble. " +
      'Schema: {"intro": string, "items": [{"slot": one of [top,bottom,outerwear,shoes,accessory], "name": string, "search": string, "why": string}], "note": string}. ' +
      "The 'search' is a concrete shoppable English phrase (e.g. 'navy linen blazer men slim fit'). " +
      "Include 3-5 items covering at least top, bottom/dress, and shoes. " +
      (arabic ? "Write intro, name, why, note in Arabic. Keep 'search' in ENGLISH." : "Write everything in English.");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system, messages: [{ role: "user", content: text }] }),
      });
      const data = await response.json();
      const raw = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("").replace(/```json|```/g, "").trim();
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
    <div dir={dir} className={`ao-root ${ar ? "ao-ar" : ""}`}>
      <style>{CSS}</style>

      {/* Top bar */}
      <nav className="ao-nav">
        <div className="ao-nav-inner">
          <a href="/" className="ao-logo">Askoutfit</a>
          <div className="ao-nav-right">
            <a href={ar ? "/articles-ar/" : "/articles/"} className="ao-nav-link">{ar ? "المقالات" : "Articles"}</a>
            <button className="ao-lang-btn" onClick={() => { const n = ar ? "en" : "ar"; setLang(n); track("lang_toggle", { to: n }); }}>
              <Globe size={13} /> {ar ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="ao-hero">
        <div className="ao-hero-glow" aria-hidden />
        <div className="ao-hero-head">
          <div className="ao-badge"><Sparkles size={13} /> {ar ? "مُنسّق أزياء بالذكاء الاصطناعي" : "Your AI stylist"}</div>
          <h1 className="ao-h1">{ar ? "ماذا ألبس اليوم؟" : "What should I wear?"}</h1>
          <p className="ao-sub">{ar ? "صِف المناسبة بجملة، واحصل على تنسيق كامل قابل للشراء في ثوانٍ." : "Describe the occasion in a sentence. Get a complete, shoppable outfit in seconds."}</p>
          <p className="ao-trust">{ar ? "٢٧٠+ دليل أزياء مكتوب · مجاني تماماً" : "270+ outfit guides written · completely free"}</p>
        </div>

        {/* Tool card */}
        <div ref={toolRef} className="ao-tool-wrap">
          <div className="ao-card">
            <div className="ao-gender">
              <span className="ao-gender-label">{ar ? "التنسيق لـ:" : "Styling for:"}</span>
              {[{ key: "women", en: "Women", ar: "نساء" }, { key: "men", en: "Men", ar: "رجال" }].map((g) => (
                <button key={g.key} aria-pressed={gender === g.key}
                  className={`ao-gender-btn ${gender === g.key ? "is-active" : ""}`}
                  onClick={() => { const n = gender === g.key ? "" : g.key; setGender(n); track("gender_select", { gender: n || "unspecified" }); }}>
                  {ar ? g.ar : g.en}
                </button>
              ))}
            </div>
            <textarea ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate(); }}
              rows={3} className="ao-textarea"
              placeholder={ar ? "مثال: حفل زفاف صيفي خارجي، رجال..." : "e.g. Summer outdoor wedding, men..."} />
            <div className="ao-card-foot">
              <span className="ao-hint">{ar ? "بالعربية أو الإنجليزية" : "English or Arabic"}</span>
              <button className="ao-cta-btn" onClick={() => generate()} disabled={loading || !query.trim()}>
                {loading ? <Loader2 size={16} className="ao-spin" /> : <ArrowRight size={16} className={ar ? "ao-flip" : ""} />}
                {ar ? "أنشئ التنسيق" : "Style me"}
              </button>
            </div>
          </div>

          {!result && !loading && (
            <div className="ao-examples">
              {EXAMPLES[lang].map((ex) => (
                <button key={ex} className="ao-chip" onClick={() => { setQuery(ex); generate(ex); }}>{ex}</button>
              ))}
            </div>
          )}

          {error && <div className="ao-error">{error}</div>}

          {loading && <div className="ao-skeletons">{[0, 1, 2].map((i) => <div key={i} className="ao-skeleton" />)}</div>}

          {result && !loading && (
            <div className="ao-result">
              {result.intro && <p className="ao-result-intro">{result.intro}</p>}
              <div className="ao-items">
                {result.items?.map((item, i) => {
                  const meta = SLOT_META[item.slot] || SLOT_META.accessory;
                  const Icon = meta.Icon;
                  return (
                    <a key={i} href={buildAffiliateLink(item.search)} target="_blank" rel="noopener nofollow sponsored"
                      className="ao-item" onClick={() => track("affiliate_click", { item: item.search, slot: item.slot, lang })}>
                      <div className="ao-item-icon"><Icon size={20} /></div>
                      <div className="ao-item-body">
                        <span className="ao-item-slot">{meta[lang]}</span>
                        <p className="ao-item-name">{item.name}</p>
                        {item.why && <p className="ao-item-why">{item.why}</p>}
                      </div>
                      <ArrowRight size={16} className={`ao-item-arrow ${ar ? "ao-flip" : ""}`} />
                    </a>
                  );
                })}
              </div>
              {result.note && <p className="ao-note">💡 {result.note}</p>}
              <button className="ao-again" onClick={() => { setResult(null); setQuery(""); inputRef.current?.focus(); }}>
                <RefreshCw size={14} /> {ar ? "جرّب تنسيقاً آخر" : "Try another outfit"}
              </button>
              <p className="ao-disclaimer">{ar ? "قد نربح عمولة على عمليات الشراء عبر الروابط، دون أي تكلفة إضافية عليك." : "We may earn a commission on purchases through links, at no extra cost to you."}</p>
            </div>
          )}
        </div>
      </header>

      {/* How it works */}
      <section className="ao-section ao-section-alt">
        <div className="ao-wrap">
          <h2 className="ao-h2">{ar ? "ثلاث خطوات، إطلالة كاملة" : "Three steps, one complete look"}</h2>
          <div className="ao-steps">
            {STEPS[lang].map((s, i) => (
              <div key={i} className="ao-step">
                <div className="ao-step-icon"><s.Icon size={20} /></div>
                <h3 className="ao-step-title">{s.t}</h3>
                <p className="ao-step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular topics */}
      <section className="ao-section">
        <div className="ao-wrap">
          <div className="ao-topics-head"><Zap size={18} /> <h2 className="ao-h2 ao-h2-inline">{ar ? "وجهات شائعة" : "Popular looks"}</h2></div>
          <div className="ao-topics">
            {TOPICS[lang].map((topic) => (
              <a key={topic.href} href={topic.href} className="ao-topic" onClick={() => track("topic_click", { topic: topic.label, lang })}>
                <span>{topic.label}</span>
                <ArrowRight size={15} className={ar ? "ao-flip" : ""} />
              </a>
            ))}
          </div>
          <div className="ao-topics-cta">
            <button className="ao-cta-btn ao-cta-lg" onClick={scrollToTool}>
              <Sparkles size={16} /> {ar ? "أنشئ إطلالتك الآن" : "Style your look now"}
            </button>
          </div>
        </div>
      </section>

      {/* Browse by Occasion — links to category hubs */}
      <section className="ao-section ao-section-alt">
        <div className="ao-wrap">
          <h2 className="ao-h2">{ar ? "تصفح حسب المناسبة" : "Browse by Occasion"}</h2>
          <p className="ao-section-sub">{ar ? "أدلة متخصصة مكتوبة لكل مناسبة." : "Curated style guides for every event."}</p>
          <div className="ao-hubs">
            {HUBS.map(h => (
              <a key={h.slug} href={`/${h.slug}/`} className="ao-hub-card"
                 onClick={() => track("hub_click", { hub: h.slug, lang })}>
                <span className="ao-hub-emoji">{h.emoji}</span>
                <span className="ao-hub-label">{ar ? h.ar : h.en}</span>
                <ArrowRight size={14} className={ar ? "ao-flip" : ""} />
              </a>
            ))}
          </div>
          <div className="ao-topics-cta">
            <a href={ar ? "/articles-ar/" : "/articles/"} className="ao-all-link">
              {ar ? "كل الأدلة ←" : "See all guides →"}
            </a>
          </div>
        </div>
      </section>

      <footer className="ao-footer">
        <p className="ao-footer-logo">Askoutfit</p>
        <p>{ar ? "قد نربح عمولة على عمليات الشراء عبر الروابط. © " : "We may earn a commission on purchases through links. © "}{new Date().getFullYear()}</p>
        <p className="ao-footer-aiom">
          {ar ? "أحد مشاريع " : "A project by "}
          <a href="https://www.aiom.ai/contact" target="_blank" rel="noopener">AIOM Automation Solutions</a>
        </p>
        <p className="ao-footer-links">
          <a href={ar ? "/privacy-ar/" : "/privacy/"}>{ar ? "سياسة الخصوصية" : "Privacy Policy"}</a>
        </p>
      </footer>
    </div>
  );
}

const CSS = `
.ao-root{--bg:#1a1410;--surface:#221b14;--line:#3a3026;--ink:#f3ece2;--muted:#b9ad9b;--faint:#6b6052;--gold:#caa46a;
  background:var(--bg);color:var(--ink);min-height:100vh;width:100%;
  font-family:'Inter',system-ui,sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased;}
.ao-ar{font-family:'Tajawal','Inter',sans-serif;}
.ao-root *{box-sizing:border-box;}
.ao-spin{animation:ao-rot 1s linear infinite;}
@keyframes ao-rot{to{transform:rotate(360deg);}}
.ao-flip{transform:scaleX(-1);}
.ao-root a{color:var(--gold);text-decoration:none;}
.ao-root :focus-visible{outline:2px solid var(--gold);outline-offset:3px;}

.ao-nav{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(58,48,38,.6);
  background:rgba(26,20,16,.85);backdrop-filter:blur(12px);}
.ao-nav-inner{max-width:64rem;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;}
.ao-nav-right{display:flex;align-items:center;gap:16px;}
.ao-nav-link{font-size:14px;color:var(--muted);text-decoration:none;}
.ao-nav-link:hover{color:var(--ink);}
.ao-footer-aiom{margin-top:8px;font-size:12px;color:var(--faint);}
.ao-footer-aiom a{color:var(--gold);font-weight:500;}
.ao-footer-aiom a:hover{text-decoration:underline;}
.ao-footer-links{margin-top:6px;font-size:12px;}
.ao-footer-links a{color:var(--faint);}
.ao-footer-links a:hover{color:var(--muted);}
.ao-logo{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:600;letter-spacing:-.01em;text-decoration:none;}
.ao-ar .ao-logo{font-family:'Tajawal',sans-serif;}
.ao-lang-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:none;
  color:var(--muted);font-size:12px;padding:6px 12px;border-radius:999px;cursor:pointer;transition:.2s;font-family:inherit;}
.ao-lang-btn:hover{border-color:rgba(202,164,106,.5);color:var(--ink);}

.ao-hero{position:relative;overflow:hidden;}
.ao-hero-glow{position:absolute;inset-inline:0;top:0;height:420px;opacity:.6;pointer-events:none;
  background:radial-gradient(60% 80% at 50% 0%,rgba(202,164,106,.18),transparent 70%);}
.ao-hero-head{position:relative;max-width:48rem;margin:0 auto;padding:56px 20px 32px;text-align:center;}
.ao-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(202,164,106,.3);
  background:rgba(202,164,106,.1);color:var(--gold);font-size:12px;padding:4px 12px;border-radius:999px;margin-bottom:16px;}
.ao-h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.4rem,6vw,3.6rem);font-weight:600;line-height:1.08;margin:0;}
.ao-ar .ao-h1{font-family:'Tajawal',sans-serif;font-weight:700;}
.ao-sub{max-width:32rem;margin:16px auto 0;font-size:clamp(15px,2vw,18px);color:var(--muted);}

.ao-tool-wrap{position:relative;max-width:42rem;margin:0 auto;padding:0 20px 64px;scroll-margin-top:96px;}
.ao-card{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:16px;box-shadow:0 20px 40px rgba(0,0,0,.3);}
.ao-gender{display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;}
.ao-gender-label{font-size:12px;color:var(--faint);}
.ao-gender-btn{border:1px solid var(--line);background:none;color:var(--muted);font-size:12px;font-weight:500;
  padding:4px 12px;border-radius:999px;cursor:pointer;transition:.2s;font-family:inherit;}
.ao-gender-btn:hover{border-color:rgba(202,164,106,.5);color:var(--ink);}
.ao-gender-btn.is-active{background:var(--gold);color:var(--bg);border-color:var(--gold);}
.ao-textarea{width:100%;resize:none;background:none;border:none;color:var(--ink);font-size:16px;font-family:inherit;outline:none;line-height:1.6;}
.ao-textarea::placeholder{color:var(--faint);}
.ao-card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;}
.ao-hint{font-size:12px;color:var(--faint);}
.ao-cta-btn{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--bg);
  font-size:14px;font-weight:500;padding:10px 20px;border-radius:12px;border:none;cursor:pointer;transition:.2s;font-family:inherit;}
.ao-cta-btn:hover:not(:disabled){background:#d8b67e;}
.ao-cta-btn:disabled{opacity:.4;cursor:not-allowed;}
.ao-cta-lg{padding:12px 24px;}

.ao-examples{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:16px;}
.ao-chip{border:1px solid var(--line);background:none;color:var(--muted);font-size:12px;
  padding:6px 12px;border-radius:999px;cursor:pointer;transition:.2s;font-family:inherit;}
.ao-chip:hover{border-color:rgba(202,164,106,.5);color:var(--ink);}

.ao-error{margin-top:20px;border:1px solid rgba(239,68,68,.3);background:rgba(239,68,68,.1);
  color:#fca5a5;font-size:14px;padding:12px 16px;border-radius:12px;}
.ao-skeletons{margin-top:24px;display:flex;flex-direction:column;gap:12px;}
.ao-skeleton{height:68px;border:1px solid var(--line);background:var(--surface);border-radius:12px;animation:ao-pulse 1.5s ease-in-out infinite;}
@keyframes ao-pulse{50%{opacity:.5;}}

.ao-result{margin-top:24px;}
.ao-result-intro{text-align:center;font-size:18px;margin-bottom:16px;}
.ao-items{display:flex;flex-direction:column;gap:12px;}
.ao-item{display:flex;align-items:flex-start;gap:16px;border:1px solid var(--line);background:var(--surface);
  border-radius:12px;padding:18px;transition:.2s;text-decoration:none;}
.ao-item:hover{border-color:rgba(202,164,106,.5);background:#271f17;}
.ao-item-icon{flex-shrink:0;width:44px;height:44px;display:flex;align-items:center;justify-content:center;
  border-radius:10px;background:rgba(202,164,106,.12);color:var(--gold);}
.ao-item-body{min-width:0;flex:1;}
.ao-item-slot{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--faint);}
.ao-item-name{font-weight:600;margin:0;line-height:1.4;}
.ao-item-why{font-size:13px;color:var(--muted);margin:4px 0 0;line-height:1.5;}
.ao-item-arrow{flex-shrink:0;color:var(--faint);}
.ao-item:hover .ao-item-arrow{color:var(--gold);}
.ao-note{margin-top:16px;border:1px solid var(--line);background:rgba(34,27,20,.5);
  padding:12px 16px;border-radius:12px;font-size:14px;color:var(--muted);}
.ao-again{display:flex;align-items:center;gap:8px;margin:20px auto 0;background:none;border:none;
  color:var(--gold);font-size:14px;cursor:pointer;font-family:inherit;}
.ao-again:hover{text-decoration:underline;}
.ao-disclaimer{margin-top:20px;text-align:center;font-size:10px;color:var(--faint);}

.ao-section{border-top:1px solid rgba(58,48,38,.6);}
.ao-section-alt{background:#1d1610;}
.ao-wrap{max-width:64rem;margin:0 auto;padding:64px 20px;}
.ao-h2{font-family:'Playfair Display',serif;font-size:clamp(22px,3.5vw,30px);font-weight:600;text-align:center;margin:0;}
.ao-ar .ao-h2{font-family:'Tajawal',sans-serif;font-weight:700;}
.ao-h2-inline{text-align:start;}
.ao-steps{display:grid;gap:20px;margin-top:40px;grid-template-columns:1fr;}
@media(min-width:640px){.ao-steps{grid-template-columns:repeat(3,1fr);}}
.ao-step{border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:24px;}
.ao-step-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;
  border-radius:12px;background:rgba(202,164,106,.12);color:var(--gold);margin-bottom:16px;}
.ao-step-title{font-size:18px;font-weight:600;margin:0;}
.ao-step-desc{font-size:14px;color:var(--muted);margin:8px 0 0;}

.ao-topics-head{display:flex;align-items:center;gap:8px;margin-bottom:32px;color:var(--gold);}
.ao-topics{display:grid;gap:12px;grid-template-columns:1fr;}
@media(min-width:640px){.ao-topics{grid-template-columns:repeat(2,1fr);}}
@media(min-width:1024px){.ao-topics{grid-template-columns:repeat(3,1fr);}}
.ao-topic{display:flex;align-items:center;justify-content:space-between;border:1px solid var(--line);
  background:var(--surface);padding:16px 20px;border-radius:12px;transition:.2s;font-size:14px;font-weight:500;color:var(--ink);}
.ao-topic:hover{border-color:rgba(202,164,106,.5);background:#271f17;}
.ao-topic svg{color:var(--faint);transition:.2s;flex-shrink:0;}
.ao-topic:hover svg{color:var(--gold);}
.ao-topics-cta{text-align:center;margin-top:40px;}
.ao-trust{font-size:13px;color:var(--faint);margin-top:8px;letter-spacing:.01em;}
.ao-section-sub{color:var(--muted);font-size:16px;margin-top:6px;margin-bottom:0;}
.ao-hubs{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-top:20px;}
.ao-hub-card{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--surface);text-decoration:none;color:var(--ink);transition:.2s;}
.ao-hub-card:hover{border-color:color-mix(in srgb,var(--gold) 50%,transparent);background:#271f17;}
.ao-hub-emoji{font-size:20px;flex-shrink:0;}
.ao-hub-label{flex:1;font-size:14px;font-weight:500;color:var(--gold);}
.ao-hub-card:hover .ao-hub-label{color:#d8b67e;}
.ao-all-link{display:inline-block;color:var(--gold);font-size:14px;font-weight:500;text-decoration:none;}
.ao-all-link:hover{text-decoration:underline;}

.ao-footer{border-top:1px solid rgba(58,48,38,.6);background:#1d1610;text-align:center;padding:40px 20px;font-size:12px;color:var(--faint);}
.ao-footer-logo{font-family:'Playfair Display',serif;font-size:16px;color:var(--muted);margin:0 0 12px;}

@media(prefers-reduced-motion:reduce){.ao-root *{transition:none!important;animation:none!important;}}
`;
