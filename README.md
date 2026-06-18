# Askoutfit — مشروع Astro الكامل

موقع واحد يدمج **الأداة** (محرك التوصية بالذكاء الاصطناعي) و**540 صفحة محتوى SEO**، ثنائي اللغة (عربي/إنجليزي)، جمهور عالمي، ينشر تلقائياً على GitHub Pages.

## البنية

```
astro-project/
├── src/
│   ├── pages/
│   │   ├── index.astro          ← الصفحة الرئيسية (تستضيف الأداة)
│   │   ├── [slug].astro         ← يولّد صفحة لكل مقال + schema كامل
│   │   └── sitemap.xml.ts       ← خريطة موقع ديناميكية مع hreflang
│   ├── components/
│   │   └── AskoutfitHome.jsx    ← الأداة (React)
│   ├── layouts/
│   │   └── Base.astro           ← GA4 + الخطوط + ميتا SEO (مكان واحد)
│   ├── content/articles/        ← مقالات JSON (مخزّنة، تُولّد مرة واحدة)
│   └── keywords.json            ← 540 نية بحث
├── scripts/
│   ├── build-keywords.mjs       ← يولّد keywords.json من المصفوفة
│   └── generate-content.mjs     ← يكتب المقالات (يتخطى المخزّن = صفر تكلفة مكررة)
├── public/robots.txt
└── .github/workflows/deploy.yml ← نشر تلقائي
```

## التشغيل المحلي

```bash
npm install                 # تثبيت (مرة واحدة)
npm run dev                 # معاينة على http://localhost:4321
```

## توليد المحتوى (540 صفحة)

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm run build:content                  # يولّد كل المقالات الناقصة
# أو دفعة صغيرة للتجربة:
node scripts/generate-content.mjs --limit 20
```

المقالات تُخزَّن في `src/content/articles/`. إعادة التشغيل تتخطى الموجود، فلا تدفع تكلفة API مرتين. لإعادة توليد مقال، احذف ملف JSON الخاص به.

## البناء والنشر

```bash
npm run build               # يبني الموقع كاملاً في dist/
```

### النشر على GitHub Pages (تلقائي)
1. ارفع المشروع إلى GitHub (انظر أوامر git أدناه).
2. في إعدادات المستودع: Settings → Pages → Source → **GitHub Actions**.
3. أضف مفتاحك: Settings → Secrets and variables → Actions → New secret باسم `ANTHROPIC_API_KEY`.
4. كل `git push` يبني وينشر تلقائياً.

### أوامر git أول مرة
```bash
git init
git add .
git commit -m "Askoutfit: full Astro build"
git branch -M main
git remote add origin https://github.com/USERNAME/askoutfit.git
git push -u origin main
```

## قبل الإطلاق — استبدل هذه القيم

| العنصر | الملف | ماذا تفعل |
|---|---|---|
| تاج الأفلييت | `components/AskoutfitHome.jsx` | استبدل `YOUR_TAG-20` بتاجك من Amazon Associates |
| كود GA4 | `layouts/Base.astro` | `G-FNPXSJF5RN` مدمج ✓ |
| النطاق | `astro.config.mjs` + `[slug].astro` + `sitemap.xml.ts` | `askoutfit.com` (موجود) |
| الصور | `public/` | ارفع `og-default.jpg` و`logo.png` |

## الجمهور العالمي
الموقع غير محصور بأي منطقة. لربح من كل الجنسيات عبر أمازون، فعّل **OneLink**
من لوحة Amazon Associates — يحوّل كل زائر لمتجر بلده تلقائياً دون تغيير الكود.

## أحداث GA4 المدمجة
`outfit_request` · `outfit_generated` · `affiliate_click` · `cta_click` ·
`gender_select` · `topic_click` · `lang_toggle`

## ملاحظة مهمة عن الأداة
الأداة تستدعي Claude API من المتصفح مباشرة. على الموقع الحي يجب توجيه الطلب
عبر وسيط (proxy) خفيف يخفي مفتاحك — لا تضع مفتاح API في كود الواجهة العلني.
أبسط حل: دالة serverless صغيرة (Cloudflare Worker / Vercel Function) تمرّر الطلب.
أخبرني وأبنيها لك عند الإطلاق.
