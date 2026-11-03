// geo-shop.ts - منتجات الأفلييت الذكية لصفحات المدن
export type ClimateType = 'hot_dry' | 'hot_humid' | 'mediterranean' | 'temperate' | 'continental' | 'tropical' | 'subtropical';
export type SeasonType = 'summer' | 'winter' | 'spring' | 'fall';
export type GenderType = 'men' | 'women';

export interface GeoShopConfig {
  climate: ClimateType;
  season: SeasonType;
  gender?: GenderType;
  lang: 'en' | 'ar';
}
const BASE_TERMS = {
  hot_dry: {
    summer: { men: ['mens linen shirt', 'mens linen trousers', 'mens wide brim hat', 'mens polarized sunglasses', 'mens lightweight sandals'], women: ['womens linen dress', 'womens cotton maxi dress', 'womens wide brim sun hat', 'womens uv protection sunglasses', 'womens lightweight scarf'] },
    winter: { men: ['mens light blazer', 'mens smart casual trousers', 'mens leather loafers', 'mens merino sweater', 'mens cotton shirt'], women: ['womens midi dress winter', 'womens light trench coat', 'womens ankle boots', 'womens cashmere scarf', 'womens wool blend trousers'] },
    spring: { men: ['mens linen blazer', 'mens chinos', 'mens polo shirt', 'mens loafers', 'mens light scarf'], women: ['womens floral midi dress', 'womens light cardigan', 'womens ballet flats', 'womens crossbody bag', 'womens silk scarf'] },
    fall: { men: ['mens lightweight jacket', 'mens dark jeans', 'mens merino wool sweater', 'mens chelsea boots', 'mens cotton shirt'], women: ['womens trench coat', 'womens knit dress', 'womens knee high boots', 'womens wool scarf', 'womens leather tote'] }
  },
  hot_humid: {
    summer: { men: ['mens moisture wicking shirt', 'mens quick dry shorts', 'mens breathable sandals', 'mens packable rain jacket', 'mens cooling towel'], women: ['womens moisture wicking dress', 'womens quick dry shorts', 'womens breathable sandals', 'womens packable rain jacket', 'womens cooling towel'] },
    winter: { men: ['mens light linen shirt', 'mens chino shorts', 'mens canvas sneakers', 'mens light cardigan', 'mens packable tote'], women: ['womens cotton sundress', 'womens linen pants', 'womens espadrilles', 'womens light kimono', 'womens straw tote bag'] },
    spring: { men: ['mens performance polo', 'mens hybrid shorts', 'mens water shoes', 'mens uv protection shirt', 'mens quick dry towel'], women: ['womens performance dress', 'womens swim cover up', 'womens water sandals', 'womens uv protection hat', 'womens quick dry towel'] },
    fall: { men: ['mens quick dry pants', 'mens moisture wicking tee', 'mens trail shoes', 'mens light rain shell', 'mens packable backpack'], women: ['womens quick dry leggings', 'womens moisture wicking top', 'womens hiking sandals', 'womens packable rain poncho', 'womens dry bag'] }
  },
  mediterranean: {
    summer: { men: ['mens linen suit', 'mens cotton polo', 'mens leather loafers', 'mens straw hat', 'mens silk pocket square'], women: ['womens linen sundress', 'womens espadrille wedges', 'womens straw tote', 'womens silk scarf', 'womens oversized sunglasses'] },
    winter: { men: ['mens wool coat', 'mens cashmere sweater', 'mens dark denim', 'mens leather boots', 'mens leather gloves'], women: ['womens wool coat', 'womens turtleneck sweater', 'womens leather ankle boots', 'womens cashmere scarf', 'womens leather tote'] },
    spring: { men: ['mens light trench coat', 'mens chinos', 'mens cotton shirt', 'mens suede loafers', 'mens light scarf'], women: ['womens trench coat', 'womens midi skirt', 'womens silk blouse', 'womens ballet flats', 'womens silk scarf'] },
    fall: { men: ['mens wool blazer', 'mens dark jeans', 'mens merino sweater', 'mens leather boots', 'mens cashmere scarf'], women: ['womens wool blazer', 'womens midi dress', 'womens knee boots', 'womens cashmere wrap', 'womens leather satchel'] }
  },
  temperate: {
    summer: { men: ['mens lightweight suit', 'mens cotton shirt', 'mens leather loafers', 'mens pocket square', 'mens silk tie'], women: ['womens silk dress', 'womens block heel sandals', 'womens structured tote', 'womens silk scarf', 'womens pearl earrings'] },
    winter: { men: ['mens wool overcoat', 'mens cashmere sweater', 'mens flannel shirt', 'mens leather gloves', 'mens wool scarf'], women: ['womens wool coat', 'womens cashmere sweater', 'womens leather gloves', 'womens wool scarf', 'womens leather boots'] },
    spring: { men: ['mens trench coat', 'mens merino sweater', 'mens chinos', 'mens leather sneakers', 'mens light scarf'], women: ['womens trench coat', 'womens midi dress', 'womens cardigan', 'womens ankle boots', 'womens silk scarf'] },
    fall: { men: ['mens wool blazer', 'mens turtleneck', 'mens dark denim', 'mens chelsea boots', 'mens cashmere scarf'], women: ['womens wool coat', 'womens knit dress', 'womens knee boots', 'womens cashmere wrap', 'womens leather satchel'] }
  }
};const BASE_TERMS2 = {
  continental: {
    summer: { men: ['mens tropical wool suit', 'mens cotton dress shirt', 'mens leather oxfords', 'mens silk tie', 'mens pocket square'], women: ['womens silk sheath dress', 'womens low heel pumps', 'womens structured tote', 'womens pearl necklace', 'womens silk scarf'] },
    winter: { men: ['mens down parka', 'mens thermal base layer', 'mens wool sweater', 'mens insulated boots', 'mens fleece gloves'], women: ['womens down coat', 'womens thermal leggings', 'womens wool sweater', 'womens insulated boots', 'womens fleece scarf'] },
    spring: { men: ['mens field jacket', 'mens merino sweater', 'mens jeans', 'mens hiking boots', 'mens beanie'], women: ['womens field jacket', 'womens fleece pullover', 'womens jeans', 'womens hiking boots', 'womens beanie'] },
    fall: { men: ['mens wool peacoat', 'mens flannel shirt', 'mens corduroy pants', 'mens leather boots', 'mens wool scarf'], women: ['womens wool coat', 'womens flannel shirt', 'womens corduroy pants', 'womens ankle boots', 'womens wool scarf'] }
  },
  tropical: {
    summer: { men: ['mens board shorts', 'mens uv swim shirt', 'mens water sandals', 'mens dry bag', 'mens reef safe sunscreen'], women: ['womens swim cover up', 'womens quick dry shorts', 'womens water sandals', 'womens dry bag', 'womens reef safe sunscreen'] },
    winter: { men: ['mens linen shirt', 'mens chino shorts', 'mens leather sandals', 'mens straw hat', 'mens canvas tote'], women: ['womens cotton sundress', 'womens linen pants', 'womens leather sandals', 'womens straw hat', 'womens raffia tote'] },
    spring: { men: ['mens performance tee', 'mens hybrid shorts', 'mens water shoes', 'mens packable rain jacket', 'mens quick dry towel'], women: ['womens performance dress', 'womens swim cover up', 'womens water sandals', 'womens packable rain jacket', 'womens quick dry towel'] },
    fall: { men: ['mens quick dry pants', 'mens moisture wicking shirt', 'mens trail shoes', 'mens light rain shell', 'mens dry bag'], women: ['womens quick dry leggings', 'womens moisture wicking top', 'womens hiking sandals', 'womens packable rain poncho', 'womens dry bag'] }
  },
  subtropical: {
    summer: { men: ['mens moisture wicking polo', 'mens chino shorts', 'mens breathable sneakers', 'mens packable rain jacket', 'mens cooling towel'], women: ['womens moisture wicking dress', 'womens linen shorts', 'womens breathable sneakers', 'mens packable rain jacket', 'mens cooling towel'] },
    winter: { men: ['mens light merino sweater', 'mens chinos', 'mens leather loafers', 'mens light scarf', 'mens leather jacket'], women: ['womens light sweater', 'womens midi skirt', 'womens ankle boots', 'womens silk scarf', 'womens leather jacket'] },
    spring: { men: ['mens light bomber jacket', 'mens cotton polo', 'mens chinos', 'mens white sneakers', 'mens baseball cap'], women: ['womens light bomber jacket', 'womens midi dress', 'womens white sneakers', 'womens crossbody bag', 'womens baseball cap'] },
    fall: { men: ['mens light wool jacket', 'mens merino sweater', 'mens dark jeans', 'mens chelsea boots', 'mens leather gloves'], women: ['womens light wool coat', 'womens knit dress', 'womens ankle boots', 'womens cashmere scarf', 'womens leather tote'] }
  }
};const AR_LABELS = {
  hot_dry: {
    summer: { men: ['قميص كتاني رجالي', 'بنطال كتاني رجالي', 'قبعة شمس واسعة', 'نظارة شمسية مستقطبة', 'صندل خفيف رجالي'], women: ['فستان كتاني نسائي', 'فستان قطني ماكسي', 'قبعة شمس واسعة', 'نظارة شمسية بحماية UV', 'وشاح خفيف نسائي'] },
    winter: { men: ['بليزر خفيف رجالي', 'بنطال كاجوال ذكي', 'حذاء لوفر جلدي', 'سوتر ميرينو', 'قميص قطني'], women: ['فستان ميدي شتوي', 'ترنش كوت خفيف', 'بوت كاحل', 'وشاح كشمير', 'بنطال صوف مخلوط'] },
    spring: { men: ['بليزر كتاني', 'شينو رجالي', 'قميص بولو', 'لوفر', 'وشاح خفيف'], women: ['فستان زهري ميدي', 'كارديجان خفيف', 'باليه فلات', 'حقيبة كروس بودي', 'وشاح حرير'] },
    fall: { men: ['جاكيت خفيف', 'جينز داكن', 'سوتر ميرينو صوف', 'بوت تشيلسي', 'قميص قطني'], women: ['ترنش كوت', 'فستان كنيت', 'بوت ركبة', 'وشاح صوف', 'حقيبة توت جلدية'] }
  },
  hot_humid: {
    summer: { men: ['قميص يمتص الرطوبة', 'شورت سريع الجفاف', 'صندل تنفس', 'معطف مطر قابل للطي', 'منشفة تبريد'], women: ['فستان يمتص الرطوبة', 'شورت سريع الجفاف', 'صندل تنفس', 'معطف مطر قابل للطي', 'منشفة تبريد'] },
    winter: { men: ['قميص كتاني خفيف', 'شورت شينو', 'حذاء كانفاس', 'كارديجان خفيف', 'حقيبة توت قابلة للطي'], women: ['فستان قطني صيفي', 'بنطال كتاني', 'إسبادريل', 'كيمونو خفيف', 'حقيبة قش'] },
    spring: { men: ['قميص بولو أداء', 'شورت هجين', 'حذاء مائي', 'قميص حماية UV', 'منشفة سريع الجفاف'], women: ['فستان أداء', 'غطاء سباحة', 'صندل مائي', 'قبعة حماية UV', 'منشفة سريع الجفاف'] },
    fall: { men: ['بنطال سريع الجفاف', 'تيشيرت يمتص الرطوبة', 'حذاء تريل', 'غلاف مطر خفيف', 'حقيبة ظهر قابلة للطي'], women: ['ليجنز سريع الجفاف', 'توب يمتص الرطوبة', 'صندل مشي', 'بشورة مطر قابلة للطي', 'حقيبة جافة'] }
  },
  mediterranean: {
    summer: { men: ['بدلة كتانية', 'قميص بولو قطني', 'لوفر جلدي', 'قبعة قش', 'منديل جيب حرير'], women: ['فستان كتاني صيفي', 'إسبادريل بكعب', 'حقيبة توت قش', 'وشاح حرير', 'نظارة شمس كبيرة'] },
    winter: { men: ['معطف صوف', 'سوتر كشمير', 'جينز داكن', 'بوت جلدي', 'قفازات جلدية'], women: ['معطف صوف', 'سوتر برقبة عالية', 'بوت كاحل جلدي', 'وشاح كشمير', 'حقيبة توت جلدية'] },
    spring: { men: ['ترنش كوت خفيف', 'شينو', 'قميص قطني', 'لوفر سويد', 'وشاح خفيف'], women: ['ترنش كوت', 'تنورة ميدي', 'بلوزة حرير', 'باليه فلات', 'وشاح حرير'] },
    fall: { men: ['بليزر صوف', 'جينز داكن', 'سوتر ميرينو', 'بوت جلدي', 'وشاح كشمير'], women: ['بليزر صوف', 'فستان ميدي', 'بوت ركبة', 'وشاح كشمير', 'حقيبة ساتشل جلدية'] }
  },
  temperate: {
    summer: { men: ['بدلة خفيفة', 'قميص قطني', 'لوفر جلدي', 'منديل جيب', 'ربطة عنق حرير'], women: ['فستان حرير', 'صندل بكعب كتلة', 'حقيبة توت منظمة', 'وشاح حرير', 'أقراط لؤلؤ'] },
    winter: { men: ['معطف صوف طويل', 'سوتر كشمير', 'قميص فلانيل', 'قفازات جلدية', 'وشاح صوف'], women: ['معطف صوف', 'سوتر كشمير', 'قفازات جلدية', 'وشاح صوف', 'بوت جلدي'] },
    spring: { men: ['ترنش كوت', 'سوتر ميرينو', 'شينو', 'حذاء رياضي جلدي', 'وشاح خفيف'], women: ['ترنش كوت', 'فستان ميدي', 'كارديجان', 'بوت كاحل', 'وشاح حرير'] },
    fall: { men: ['بليزر صوف', 'تيشيرت برقبة عالية', 'جينز داكن', 'بوت تشيلسي', 'وشاح كشمير'], women: ['معطف صوف', 'فستان كنيت', 'بوت ركبة', 'وشاح كشمير', 'حقيبة ساتشل جلدية'] }
  }
};const AR_LABELS2 = {
  continental: {
    summer: { men: ['بدلة صوف استوائي', 'قميص رسمي قطني', 'أكسفورد جلدي', 'ربطة عنق حرير', 'منديل جيب'], women: ['فستان حرير', 'مضخة بكعب منخفض', 'حقيبة توت منظمة', 'قلادة لؤلؤ', 'وشاح حرير'] },
    winter: { men: ['باركا داون', 'طبقة أساسية حرارية', 'سوتر صوف', 'بوت معزول', 'قفازات فليس'], women: ['معطف داون', 'ليجنز حرارية', 'سوتر صوف', 'بوت معزول', 'وشاح فليس'] },
    spring: { men: ['جاكيت ميداني', 'سوتر ميرينو', 'جينز', 'بوت مشي', 'بياني'], women: ['جاكيت ميداني', 'بوفر فليس', 'جينز', 'بوت مشي', 'بياني'] },
    fall: { men: ['بيكوت صوف', 'قميص فلانيل', 'بنطال كوردوروي', 'بوت جلدي', 'وشاح صوف'], women: ['معطف صوف', 'قميص فلانيل', 'بنطال كوردوروي', 'بوت كاحل', 'وشاح صوف'] }
  },
  tropical: {
    summer: { men: ['شورت سباحة', 'قميص سباحة UV', 'صندل مائي', 'حقيبة جافة', 'واقي شمسي آمن للشعاب'], women: ['غطاء سباحة', 'شورت سريع الجفاف', 'صندل مائي', 'حقيبة جافة', 'واقي شمسي آمن للشعاب'] },
    winter: { men: ['قميص كتاني', 'شورت شينو', 'صندل جلدي', 'قبعة قش', 'حقيبة توت كانفاس'], women: ['فستان قطني صيفي', 'بنطال كتاني', 'صندل جلدي', 'قبعة قش', 'حقيبة توت رافيا'] },
    spring: { men: ['قميص بولو أداء', 'شورت هجين', 'حذاء مائي', 'معطف مطر قابل للطي', 'منشفة سريع الجفاف'], women: ['فستان أداء', 'غطاء سباحة', 'صندل مائي', 'معطف مطر قابل للطي', 'منشفة سريع الجفاف'] },
    fall: { men: ['بنطال سريع الجفاف', 'قميص يمتص الرطوبة', 'حذاء تريل', 'بشورة مطر خفيفة', 'حقيبة جافة'], women: ['ليجنز سريع الجفاف', 'توب يمتص الرطوبة', 'صندل مشي', 'بشورة مطر قابلة للطي', 'حقيبة جافة'] }
  },
  subtropical: {
    summer: { men: ['قميص بولو يمتص الرطوبة', 'شورت شينو', 'حذاء رياضي تنفس', 'معطف مطر قابل للطي', 'منشفة تبريد'], women: ['فستان يمتص الرطوبة', 'شورت كتاني', 'حذاء رياضي تنفس', 'معطف مطر قابل للطي', 'منشفة تبريد'] },
    winter: { men: ['سوتر ميرينو خفيف', 'شينو', 'لوفر جلدي', 'وشاح خفيف', 'جاكيت جلدي'], women: ['سوتر خفيف', 'تنورة ميدي', 'بوت كاحل', 'وشاح حرير', 'جاكيت جلدي'] },
    spring: { men: ['جاكيت بومبر خفيف', 'قميص بولو قطني', 'شينو', 'حذاء رياضي أبيض', 'قبعة بيسبول'], women: ['جاكيت بومبر خفيف', 'فستان ميدي', 'حذاء رياضي أبيض', 'حقيبة كروس بودي', 'قبعة بيسبول'] },
    fall: { men: ['جاكيت صوف خفيف', 'سوتر ميرينو', 'جينز داكن', 'بوت تشيلسي', 'قفازات جلدية'], women: ['معطف صوف خفيف', 'فستان كنيت', 'بوت كاحل', 'وشاح كشمير', 'حقيبة توت جلدية'] }
  }
};

const ALL_CLIMATES = { ...BASE_TERMS, ...BASE_TERMS2 };
const ALL_AR_LABELS = { ...AR_LABELS, ...AR_LABELS2 };

export function getGeoShopItems(config) {
  const { climate, season, gender = 'men', lang = 'en' } = config;
  const climateTerms = ALL_CLIMATES[climate] || ALL_CLIMATES.temperate;
  const seasonTerms = climateTerms[season] || climateTerms.summer;
  const terms = seasonTerms[gender] || seasonTerms.men;
  if (lang === 'ar') {
    const climateLabels = ALL_AR_LABELS[climate] || ALL_AR_LABELS.temperate;
    const seasonLabels = climateLabels[season] || climateLabels.summer;
    const labels = seasonLabels[gender] || seasonLabels.men;
    return { terms, labels };
  }
  return { terms, labels: terms };
}

export function buildAmazonLink(term, tag = 'askoutfit-20') {
  return 'https://www.amazon.com/s?k=' + encodeURIComponent(term) + '&tag=' + tag;
}
