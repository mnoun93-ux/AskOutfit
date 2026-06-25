// ── Geo pSEO content data ─────────────────────────────────────────────────────

export const GEO_SEASONS = ["summer","winter","spring","fall"] as const;
export type GeoSeason = typeof GEO_SEASONS[number];

export const SEASON_LABELS: Record<string, string> = {
  summer: "Summer",
  winter: "Winter",
  spring: "Spring",
  fall: "Autumn",
};

interface ClimateSeasonContent {
  intro: string;
  tips: string[];
  packing: string[];
  occasions: string[];
  faq: { q: string; a: string }[];
}

export const GEO_CLIMATE_CONTENT: Record<string, Record<string, ClimateSeasonContent>> = {
  hot_dry: {
    summer: {
      intro: "Summer in a hot, dry desert climate means extreme heat — temperatures regularly exceed 40°C (104°F). Your outfit choices need to prioritise sun protection and breathability above everything else. The good news: the heat is dry, so the right fabrics actually keep you comfortable.",
      tips: [
        "Choose ultra-lightweight fabrics: linen, cotton voile, and moisture-wicking blends in light colours that reflect rather than absorb heat. Dark colours will make the heat feel significantly worse.",
        "Cover up strategically — loose, flowing layers actually feel cooler than bare skin in direct sun, protecting you from sunburn and intense UV radiation.",
        "Invest in quality sunglasses, a wide-brim hat, and UV-protective fabrics. Sun protection is a non-negotiable part of your summer wardrobe in desert climates.",
      ],
      packing: ["Linen trousers and shirts","Cotton or linen maxi dresses","UV-protective wide-brim hat","Quality polarised sunglasses","Lightweight scarf for shade","Breathable sandals or slip-ons"],
      occasions: ["casual-outing","travel-day","beach-party"],
      faq: [
        { q: "What is the best fabric to wear in desert summer heat?", a: "Linen is the gold standard for hot, dry climates — it's breathable, lightweight, and gets softer with washing. Cotton voile and moisture-wicking blends also work well. Avoid polyester and synthetic blends that trap heat." },
        { q: "Should I cover up or wear as little as possible in extreme heat?", a: "Counterintuitively, loose, lightweight layers are cooler than bare skin in direct desert sun. They protect you from UV radiation and reflect heat rather than letting your skin absorb it. Flowing linen trousers are more comfortable than shorts in 40°C heat." },
        { q: "What shoes work best in summer desert heat?", a: "Open sandals with good arch support are ideal — they allow airflow and keep feet cool. Avoid dark-coloured shoes that absorb heat. Lightweight slip-on espadrilles are another good option for comfort and style." },
      ],
    },
    winter: {
      intro: "Winter in a hot desert climate is surprisingly pleasant — warm, sunny days with mild temperatures between 18–25°C (64–77°F), and cooler evenings that may require a light layer. This is peak tourist season in many desert cities, and the weather is genuinely ideal for exploring.",
      tips: [
        "Pack a versatile light jacket or blazer for evenings — temperatures can drop noticeably after sunset in desert climates, even when daytime feels warm.",
        "Daytime calls for the same lightweight layers as the rest of the world's spring: light trousers, casual shirts, and breathable fabrics.",
        "A light scarf or wrap works double duty — warmth in the evenings and cultural modesty in traditional areas.",
      ],
      packing: ["Light jacket or blazer","Smart casual trousers","Linen or cotton shirts","Light knitwear","Comfortable walking shoes","Light scarf or wrap"],
      occasions: ["casual-outing","dinner-party","travel-day","brunch"],
      faq: [
        { q: "Is it cold in desert cities in winter?", a: "Desert winters are mild by global standards but can feel cool, especially in the evenings. Expect daytime temperatures of 18–25°C (64–77°F) and evenings around 12–16°C (54–61°F). A light jacket is all you need — not a heavy winter coat." },
        { q: "What should I wear for evening dining in a desert city in winter?", a: "Smart casual is ideal for winter dining in Gulf and desert cities. A blazer or light jacket over a nice shirt or dress is both appropriate and practical for the slightly cooler evenings." },
        { q: "Do I need to dress modestly in desert cities in winter?", a: "Modesty norms are consistent year-round in conservative desert cities like Riyadh, Kuwait City, and Muscat. In more cosmopolitan destinations like Dubai, the rules are relaxed outside of religious sites, but modest dress in public spaces is always respectful." },
      ],
    },
    spring: {
      intro: "Spring in a hot desert climate transitions quickly from mild to very warm — temperatures climb from around 25°C to over 35°C (77–95°F) by late spring. Dressing in adaptable, lightweight layers is the smart approach for this transitional season.",
      tips: [
        "Opt for transitional fabrics that work across a range of temperatures — linen and cotton blends are your best friends for spring desert dressing.",
        "Early spring mornings can be fresh, so a light layer you can easily remove is practical for sightseeing and outdoor activities.",
        "As the season progresses towards May and June, shift into full summer mode: lightweight fabrics, sun protection, and breathable silhouettes.",
      ],
      packing: ["Lightweight linen set","Breathable cotton dresses or shirts","Light cardigan for early spring mornings","Sandals and comfortable flats","Wide-brim hat","Sunglasses"],
      occasions: ["casual-outing","brunch","travel-day","first-date"],
      faq: [
        { q: "What is the weather like in desert cities in spring?", a: "Spring (March–May) in desert cities transitions from mild to hot. March can still be quite comfortable at 25–28°C (77–82°F), while May starts to approach summer levels at 35°C+ (95°F+). Lightweight, breathable clothing is appropriate throughout." },
        { q: "Is spring a good time to visit desert cities?", a: "March and April are excellent times to visit — the weather is warm but not extreme, and you can comfortably explore outdoor attractions. By May, the heat is building significantly, so earlier in the season is preferable for active touring." },
        { q: "What's the best spring outfit for exploring a desert city?", a: "A linen set — trousers and a light blouse or shirt — is both comfortable and appropriate for exploring. Add a light scarf for visiting religious or traditional areas, and always carry a wide-brim hat and sunglasses once temperatures start climbing." },
      ],
    },
    fall: {
      intro: "Autumn in a hot desert climate remains very warm — temperatures hover between 28–38°C (82–100°F), only beginning to ease late in the season. October and November are increasingly popular travel months as the worst of the summer heat gradually retreats.",
      tips: [
        "Autumn is one of the most popular times to visit hot desert cities — the worst summer heat has passed, but you'll still need full summer-weight clothing through October.",
        "Light, breathable layers work for the cooler evenings that start to appear towards November and December.",
        "Versatile pieces that transition from day to evening are ideal — a lightweight shirt or dress that works for both sightseeing and a smart dinner.",
      ],
      packing: ["Linen or cotton outfits","Light jacket for evening (November onwards)","Versatile day-to-evening dress or shirt","Sandals and smart shoes","Light scarf"],
      occasions: ["casual-outing","dinner-party","travel-day","brunch"],
      faq: [
        { q: "Is it still hot in desert cities in autumn?", a: "Yes — October is still quite hot in most desert cities at 30–36°C (86–97°F). November starts to feel more comfortable. If you're visiting in October, bring your full summer wardrobe. By November and December, lighter layers for evenings become useful." },
        { q: "What's the dress code for autumn outdoor events in desert cities?", a: "Smart casual is the standard for most outdoor events in Gulf cities. Light linen or cotton trousers, a pressed shirt or elegant blouse, and smart sandals or shoes is the right balance for autumn weather and cultural expectations." },
        { q: "When is the best time to visit desert cities for comfortable weather?", a: "November through March offers the most comfortable temperatures in most desert cities — warm enough for light clothing but not extreme. October is on the warmer end of comfortable, while April is the tail end before summer heat builds." },
      ],
    },
  },
  hot_humid: {
    summer: {
      intro: "Summer in a hot, humid coastal climate is intensely demanding — temperatures reach 38–43°C (100–109°F) with high humidity making it feel even hotter. Moisture-wicking fabrics and loose, breathable silhouettes are non-negotiable for summer comfort.",
      tips: [
        "Choose moisture-wicking, quick-dry fabrics over cotton — cotton absorbs sweat and becomes heavy and uncomfortable quickly in high humidity.",
        "Light, loose silhouettes in breathable linen blends or performance fabrics keep you cooler by allowing air circulation.",
        "A spare shirt or blouse for the evening is a smart move — after a day of exploring in the heat, you'll want to freshen up before dinner.",
      ],
      packing: ["Moisture-wicking shirts and tops","Lightweight loose trousers","Quick-dry fabrics throughout","Breathable sandals","Light scarf or wrap","Wide-brim hat"],
      occasions: ["casual-outing","travel-day","brunch"],
      faq: [
        { q: "What's the best fabric for humid, hot weather?", a: "Moisture-wicking synthetics, linen-blend fabrics, and bamboo textiles are the best choices for hot, humid weather. Standard cotton absorbs moisture and stays damp uncomfortably. Look for fabrics labelled 'quick-dry' or 'moisture-wicking'." },
        { q: "How do I stay stylish in extreme heat and humidity?", a: "Focus on silhouette over fabric variety — loose, flowing cuts in a single lightweight material look intentionally elegant rather than sweaty. A flowy linen dress or well-cut linen trousers with a structured top read as very stylish in humid coastal cities." },
        { q: "Do I need to dress modestly in hot, humid coastal cities?", a: "Modesty norms vary by destination. In Jeddah, modest dress is respectful even at the relaxed Corniche. In more cosmopolitan coastal cities, Western beach-adjacent fashion is widely accepted near the waterfront but modest dress is expected for traditional areas and markets." },
      ],
    },
    winter: {
      intro: "Winter in a hot, humid coastal city brings welcome relief — pleasant temperatures of 20–28°C (68–82°F) with lower humidity make it the most comfortable and popular time to visit.",
      tips: [
        "A light jacket or cardigan for evenings is all you need — temperatures rarely feel genuinely cold, but sea breezes can be cooling.",
        "Smart casual clothing works perfectly for exploring the city, dining, and attending events during the comfortable winter months.",
        "Light layers give you flexibility for the range of indoor and outdoor temperatures you'll encounter.",
      ],
      packing: ["Light jacket or cardigan","Smart casual separates","Comfortable walking shoes","Light scarf","Versatile day-to-evening pieces"],
      occasions: ["casual-outing","dinner-party","brunch","travel-day"],
      faq: [
        { q: "What should I pack for a winter visit to a hot, humid coastal city?", a: "Pack light summer clothing as your main wardrobe, plus one or two light layers for evenings. Smart casual separates — trousers, a blouse or shirt, and a light blazer or cardigan — cover all eventualities without taking up much suitcase space." },
        { q: "Is winter the best time to visit humid coastal cities?", a: "For most visitors, yes — winter brings the most comfortable temperatures and lower humidity. It's peak season, so expect more crowds and higher hotel rates, but the weather rewards it." },
        { q: "What footwear is best for winter in a humid coastal city?", a: "Comfortable walking shoes or smart sandals work well. Without summer rain and heat, you have more footwear options — leather sandals, stylish mules, or smart sneakers all work comfortably in winter." },
      ],
    },
    spring: {
      intro: "Spring in a hot, humid coastal city sees temperatures rising rapidly and humidity building — a transitional period that quickly tips into full summer conditions as the weeks progress.",
      tips: [
        "Lightweight, breathable fabrics are already important — the combination of rising heat and humidity makes heavy fabrics uncomfortable quickly.",
        "Layers become less useful as the season progresses; focus on single-piece outfits in breathable materials.",
        "Cover up lightly for cultural respect and sun protection as the sun becomes stronger through the spring months.",
      ],
      packing: ["Breathable lightweight dresses","Linen trousers and tops","Light sandals","Sun hat","Light scarf for modesty and sun protection"],
      occasions: ["casual-outing","brunch","travel-day"],
      faq: [
        { q: "What is spring weather like in hot, humid coastal cities?", a: "Spring (March–May) transitions from the comfortable winter into the hot, humid summer. March and April are still relatively pleasant at 28–33°C (82–91°F), while May starts to feel genuinely hot and humid. Lightweight clothing is the right call throughout." },
        { q: "What's the best spring outfit for a humid coastal city?", a: "A loose linen dress or light trousers with a moisture-wicking blouse is ideal. Avoid denim and heavy synthetic fabrics. A breathable, light cotton scarf serves both modesty and sun protection purposes." },
        { q: "Should I bring layers for spring in a humid coastal city?", a: "Light layers are useful in the early spring (March–April) for air-conditioned malls and restaurants, which can feel cold compared to the outdoor warmth. By May, you'll barely need even a light cardigan outdoors." },
      ],
    },
    fall: {
      intro: "Autumn in a hot, humid climate gradually eases from peak summer heat but remains warm and humid through most of the season. October and November start to feel noticeably more comfortable.",
      tips: [
        "Early autumn is essentially still summer — keep the same lightweight, moisture-wicking wardrobe you'd use in peak summer.",
        "Later autumn brings cooler, more manageable temperatures — perfect for exploring with slightly more layering flexibility.",
        "A light layer for evenings becomes practical by late October or November in most humid coastal cities.",
      ],
      packing: ["Lightweight summer outfits","One light jacket for late-season evenings","Breathable sandals","Sun protection gear"],
      occasions: ["casual-outing","travel-day","dinner-party"],
      faq: [
        { q: "When does autumn start to feel comfortable in humid coastal cities?", a: "It varies, but most humid coastal cities start to feel noticeably more comfortable by mid-October or November, as humidity drops and temperatures ease from summer peaks. September is still firmly summer territory." },
        { q: "What's the typical autumn outfit for a humid coastal city?", a: "In early autumn (September–October), your summer wardrobe still applies. By November, you can start wearing slightly less heat-resistant fabrics and adding a light layer for evening outings." },
        { q: "Are there any autumn events worth dressing for in humid coastal cities?", a: "Autumn marks the return of outdoor events, festivals, and dining culture in many humid coastal cities as the heat eases. Smart casual looks that transition from daytime sightseeing to evening dining are ideal for this season." },
      ],
    },
  },
  mediterranean: {
    summer: {
      intro: "Mediterranean summers are warm to hot and gloriously sunny — temperatures typically range from 25–34°C (77–93°F) with low humidity, making this an ideal climate for summer dressing. This is the season that makes the Mediterranean so magnetic as a destination.",
      tips: [
        "Light, breathable fabrics like linen, cotton, and viscose work beautifully in the dry Mediterranean heat — you'll look put-together and feel comfortable throughout the day.",
        "Cover up lightly for visiting churches, mosques, and historic sites — a light scarf or wrap is useful and respectful, and barely adds any heat.",
        "Evening temperatures are pleasant and may only need a light jacket or wrap — this is perfect weather for elegant summer evening dining.",
      ],
      packing: ["Linen trousers and shorts","Light summer dresses","Breathable tops","Light evening layer","Sandals and comfortable walking shoes","Light scarf for cultural sites"],
      occasions: ["casual-outing","brunch","dinner-party","beach-party"],
      faq: [
        { q: "What is the dress code for Mediterranean summer evenings?", a: "Mediterranean summer evenings are perfect for elevated casual to smart casual. A linen set, a flowing dress, or tailored shorts with a quality blouse or shirt all work beautifully. Many coastal restaurants appreciate slightly elevated dressing at dinner." },
        { q: "What do I need to wear to visit churches and historical sites in summer?", a: "Most Mediterranean religious sites require covered shoulders and knees. Carry a lightweight scarf or wrap in your bag — it weighs almost nothing and means you're never turned away from a cathedral or mosque. Wrap-style skirts and pareos also work well." },
        { q: "How hot is Mediterranean summer — do I need to plan outfits differently?", a: "Mediterranean summer heat is dry rather than humid, which makes it significantly more bearable than tropical heat at the same temperature. A quality linen outfit at 32°C (90°F) in Rome or Barcelona is comfortable in a way that the same temperature in Bangkok simply isn't." },
      ],
    },
    winter: {
      intro: "Mediterranean winters are mild compared to northern Europe — cool rather than cold, with temperatures between 7–14°C (45–57°F) in most cities. Rain is more common than snow, and the combination of mild temperatures and winter atmosphere makes for romantic, uncrowded visits.",
      tips: [
        "A mid-weight coat or jacket is essential — Mediterranean winters are wetter than summers, and you'll need protection from rain and cool wind.",
        "Layer smartly: a base layer, a light knitwear piece, and a coat gives you flexibility for the mild but variable conditions.",
        "Comfortable waterproof shoes or ankle boots are more practical than sandals during the rainy winter months.",
      ],
      packing: ["Mid-weight coat","Knitwear and jumpers","Waterproof jacket or trench","Jeans and smart trousers","Ankle boots or waterproof shoes","Scarf"],
      occasions: ["casual-outing","dinner-party","brunch","travel-day"],
      faq: [
        { q: "What coat do I need for a Mediterranean winter?", a: "A mid-weight wool or trench coat is ideal — you don't need a heavy down parka, but you do need something more substantial than a light jacket. A classic trench coat is perfect: it handles rain, looks stylish, and works for the mild but variable winter temperatures." },
        { q: "Can I still wear stylish outfits in Mediterranean winter?", a: "Absolutely — Mediterranean winter is actually a wonderful season for layered, stylish dressing. Think quality knitwear, elegant coats, ankle boots, and scarves. The milder cold compared to northern Europe means you can look polished without bundling into a shapeless puffy jacket." },
        { q: "Does it snow in Mediterranean cities in winter?", a: "Snow is rare in most coastal Mediterranean cities, though it's possible in higher-altitude cities like Rome or cities further north. The main winter challenge is rain and wind rather than snow and ice." },
      ],
    },
    spring: {
      intro: "Mediterranean spring is one of the most beautiful seasons to visit — warm, bright, and comfortable with temperatures between 13–24°C (55–75°F). The classic 'light layers' season, when the landscape is at its greenest and most vibrant.",
      tips: [
        "Light layers are your essential tool — a cardigan or light jacket for the morning, removed by midday as it warms up, is the classic Mediterranean spring formula.",
        "This is prime season for effortlessly stylish outfits — linen trousers, light dresses, and smart casual tops all work perfectly in the pleasant spring temperatures.",
        "Pack versatile pieces that transition from a morning café to afternoon sightseeing to an elegant dinner without a full outfit change.",
      ],
      packing: ["Light jacket or blazer","Linen separates","Comfortable walking shoes","Spring dresses or smart trousers","Versatile day-to-evening pieces","Light scarf"],
      occasions: ["casual-outing","brunch","first-date","dinner-party"],
      faq: [
        { q: "What is Mediterranean spring weather like?", a: "Mediterranean spring (March–May) is wonderfully varied — March can still feel quite cool at 13–16°C (55–61°F), April warms to 17–21°C (63–70°F), and May is genuinely warm at 22–25°C (72–77°F). Bring a range of light layers to cover all three." },
        { q: "Is spring the best time to visit Mediterranean cities?", a: "Many travellers consider spring the ideal time — the weather is beautiful, crowds are manageable, and the landscape is at its most photogenic. April and May particularly offer near-perfect conditions." },
        { q: "What's the ideal spring outfit for sightseeing in a Mediterranean city?", a: "A linen or cotton-blend trouser with a light blouse or casual shirt, topped with a light blazer or denim jacket. Comfortable walking shoes are essential — Mediterranean cobblestones demand proper footwear, not heels or flip-flops." },
      ],
    },
    fall: {
      intro: "Mediterranean autumn is a continuation of the pleasant summer conditions, gradually cooling through October and November. Temperatures of 14–23°C (57–73°F) make for ideal dressing conditions — warm enough for light clothing, cool enough to bring back some layering.",
      tips: [
        "Light layers come back in handy — the mornings and evenings start to feel distinctly cooler as the season progresses through October into November.",
        "Pack versatile pieces that work across a range of temperatures — mid-weight fabrics like light wool blends or heavier cotton handle the autumn range well.",
        "October and November offer the classic Mediterranean autumn aesthetic: earth tones, layered knitwear, ankle boots, and elegant trench coats.",
      ],
      packing: ["Light jacket or blazer","Knitwear","Ankle boots","Smart casual trousers","Versatile dresses or shirts","Light scarf"],
      occasions: ["casual-outing","dinner-party","brunch","concert"],
      faq: [
        { q: "Is autumn still warm enough for summer clothing in Mediterranean cities?", a: "Early autumn (September, early October) is still very warm in most Mediterranean cities — summer clothing remains appropriate. By late October and November, you'll want light layers and a jacket for evenings." },
        { q: "What should I pack for a Mediterranean autumn trip?", a: "A mix of summer pieces for the warmer days and transitional layers for cooler evenings covers you perfectly. A light coat or blazer, ankle boots, knitwear, and light dresses give you the full range of Mediterranean autumn dressing." },
        { q: "Is autumn a good time to visit Mediterranean cities?", a: "Autumn is increasingly popular for good reason — the extreme summer heat has passed, tourist crowds thin out, and the weather remains beautiful. September and October particularly offer an ideal combination of warmth and calm." },
      ],
    },
  },
  temperate: {
    summer: {
      intro: "Temperate climate summers are mild and variable — temperatures typically reach 18–25°C (64–77°F), but unpredictable weather means layers are always useful even in July and August. The British saying about always packing a jacket applies year-round in temperate climates.",
      tips: [
        "Always pack a light jacket — even in summer, temperate climates can be cool, cloudy, and wet without warning. Being caught without one is genuinely uncomfortable.",
        "Lightweight layers give you the flexibility to adapt to both sunny afternoons and cool, breezy evenings in the same day.",
        "Breathable fabrics like cotton and linen still work well in the warmer days, but keep a light cardigan or jacket accessible at all times.",
      ],
      packing: ["Light jacket (essential even in summer)","Cotton or linen outfits","Light knitwear","Comfortable waterproof shoes","Light scarf","Versatile layer-friendly tops"],
      occasions: ["casual-outing","brunch","concert","first-date"],
      faq: [
        { q: "What should I pack for a summer trip to a temperate city like London or Stockholm?", a: "Pack your summer wardrobe but add a light waterproof jacket and a couple of knitwear pieces. A typical summer day might start cool and cloudy, warm up nicely by afternoon, then turn breezy by evening — layers are your friend." },
        { q: "Can I wear dresses and shorts in temperate summer?", a: "Yes — on sunny summer days, light dresses and shorts are completely appropriate. Just carry a light jacket or cardigan in your bag, because the weather can change quickly. A wrap or light blazer over a dress is a practical and stylish solution." },
        { q: "What shoes work best for temperate summer cities?", a: "Quality trainers or leather sandals with a grip are ideal for temperate summer city exploration. Avoid pure sandals without any back strap — summer rain can make them impractical. White leather sneakers are a versatile and stylish option for most temperate summer occasions." },
      ],
    },
    winter: {
      intro: "Temperate winters are cold and damp — temperatures drop to 2–9°C (36–48°F) and wind, rain, or occasional snow require proper cold-weather clothing. The challenge in temperate winter isn't just cold but persistent wet and grey conditions.",
      tips: [
        "A quality wool or down coat is non-negotiable — protection from rain and cold wind is as important as warmth in a temperate winter.",
        "Layering is essential: a thermal base layer, mid-layer knitwear, and a waterproof outer layer covers all temperate winter weather scenarios.",
        "Waterproof ankle boots or sturdy shoes are far more practical than smart shoes when navigating wet, cold streets.",
      ],
      packing: ["Warm coat (wool or down)","Thermal base layers","Knitwear and jumpers","Waterproof boots","Scarf, hat and gloves","Waterproof outer layer"],
      occasions: ["dinner-party","concert","casual-outing","business-meeting"],
      faq: [
        { q: "How cold are temperate city winters — do I need a heavy coat?", a: "Yes — a proper winter coat is necessary for temperate winters. Temperatures of 3–9°C (37–48°F) combined with damp wind feel significantly colder than dry cold at the same temperature. A quality wool or down coat rated for at least -5°C (23°F) will cover all conditions." },
        { q: "What are the best boots for a temperate winter city?", a: "Waterproof ankle or knee boots with a solid rubber sole are ideal — they handle rain, puddles, and occasional ice while looking stylish. Chelsea boots with a waterproof treatment are a classic choice. Avoid smooth-soled leather shoes that become dangerous on wet pavements." },
        { q: "How do I look stylish in temperate winter without looking bulky?", a: "The secret is layers over a slim, fitted base. A fitted thermal top, slim trousers, and a quality coat with a scarf looks elegant even in the depths of winter. Invest in good outerwear — a well-cut wool coat is far more stylish than a cheap padded jacket at the same warmth level." },
      ],
    },
    spring: {
      intro: "Temperate spring is famously unpredictable — temperatures range from 8–17°C (46–63°F) and you can experience four seasons in a single day. Layering is the only sensible strategy, and the occasional perfect spring day rewards those who dress for possibility.",
      tips: [
        "The classic 'onion layers' approach works best: a base layer, mid-layer (light jumper or cardigan), and a waterproof outer layer you can remove as the day warms.",
        "Opt for transitional fabrics like light cotton, jersey, and thin knitwear that work for both cool mornings and warmer afternoons.",
        "Waterproof but stylish footwear — quality sneakers or leather ankle boots with a water-resistant finish — gives you both practicality and style.",
      ],
      packing: ["Waterproof jacket (essential)","Light knitwear","Layer-friendly tops","Smart trousers or jeans","Versatile ankle boots","Light scarf"],
      occasions: ["casual-outing","brunch","first-date","travel-day"],
      faq: [
        { q: "What is the weather like in temperate cities in spring?", a: "Spring (March–May) in temperate cities is genuinely variable. March can feel like an extension of winter, April brings the classic mix of rain and sunshine, and May starts to feel properly warm on good days. Always check the forecast and pack layers — single-climate dressing doesn't work in temperate spring." },
        { q: "What's the best spring outfit for a rainy temperate city?", a: "A classic trench coat over a light knit and smart trousers or jeans, with ankle boots, is the definitive temperate spring outfit. The trench handles rain and wind elegantly, while the layers underneath adapt to the temperature changes throughout the day." },
        { q: "Can I wear spring dresses in a temperate climate?", a: "Yes, but time them carefully — a warm, sunny spring afternoon in a temperate city is perfect for a light dress. Just have a denim jacket or cardigan and a waterproof jacket with you. The classic combination of a spring dress over opaque tights with ankle boots extends dress-wearing well into spring." },
      ],
    },
    fall: {
      intro: "Autumn in a temperate climate is about layered, rich dressing — temperatures of 9–16°C (48–61°F) with increasing rain and wind make thoughtful layering essential. This is also when temperate fashion comes into its own, with knitwear, coats, and boots all becoming relevant.",
      tips: [
        "Autumn calls for the richest part of your wardrobe — knitwear, blazers, coats, and ankle boots all come into their own as temperatures drop.",
        "A classic trench coat is one of the most versatile investments for temperate autumn — elegant, waterproof, and works for any occasion from a morning café to an evening concert.",
        "Layer a light scarf into every outfit — it adds warmth and style simultaneously, and adjusts easily to changing temperatures throughout the day.",
      ],
      packing: ["Trench coat or autumn coat","Knitwear","Layering tops","Jeans and smart trousers","Ankle boots","Scarf"],
      occasions: ["dinner-party","casual-outing","concert","business-meeting"],
      faq: [
        { q: "What coat do I need for temperate autumn?", a: "A trench coat or mid-weight wool coat is the classic choice for temperate autumn. It handles the rain that characterises autumn in these climates, looks impeccably stylish, and is warm enough for the 9–16°C (48–61°F) temperatures. Add a scarf for extra warmth on colder days." },
        { q: "What are the best colours to wear in temperate autumn?", a: "Autumn in temperate climates naturally inspires earth tones — camel, rust, forest green, burgundy, and warm browns echo the season's landscape and work beautifully together. Rich jewel tones like emerald and deep plum are also a signature of the season." },
        { q: "What shoes are appropriate for temperate autumn?", a: "Ankle boots are the defining footwear of temperate autumn — they're warm, waterproof options handle rain and puddles, and they work with everything from jeans to dresses. Chelsea boots, lace-up leather boots, and chunky-soled boots are all good options." },
      ],
    },
  },
  continental: {
    summer: {
      intro: "Continental summers are warm to hot — temperatures reach 22–32°C (72–90°F) with typically sunny conditions. The key continental summer challenge is the dramatic difference between outdoor heat and aggressive air conditioning indoors — always carry a light layer.",
      tips: [
        "Dress for warm outdoor temperatures but always carry a light layer for heavily air-conditioned restaurants, shops, and offices.",
        "This is classic summer dressing weather — light fabrics, relaxed silhouettes, and breathable materials work perfectly for the warm, often sunny conditions.",
        "For evening dining and social events, continental summer calls for effortlessly elevated summer looks — linen sets, silk blouses, or a summer blazer.",
      ],
      packing: ["Light summer outfits","Cardigan or light jacket for A/C","Breathable shoes","Smart casual evening piece","Sunglasses and sun hat"],
      occasions: ["casual-outing","brunch","dinner-party","first-date"],
      faq: [
        { q: "What should I wear for continental summer heat?", a: "Light, breathable fabrics like linen, cotton, and viscose are ideal. Unlike tropical heat, continental summer heat is usually low humidity, making quality linen and cotton genuinely comfortable rather than just theoretically appropriate." },
        { q: "Why do I need a jacket in continental summer?", a: "Continental summers can be very warm outdoors, but air conditioning in restaurants, museums, and shops is often set aggressively cold. A light jacket, cardigan, or blazer in your bag lets you stay comfortable indoors without overheating outside." },
        { q: "What's the smartest summer outfit for a continental city evening?", a: "A linen set or a light summer dress elevated with a blazer or structured cardigan works beautifully for continental summer evenings. The warm evenings mean you rarely need more than a light layer." },
      ],
    },
    winter: {
      intro: "Continental winters are genuinely cold — temperatures can drop below -5°C (23°F) in the coldest months, and cities like New York, Seoul, Chicago, and Berlin experience proper winter with potential for snow and ice. Proper cold-weather outerwear is essential.",
      tips: [
        "A heavy winter coat — wool, down, or padded — is non-negotiable for a continental winter. The combination of cold temperatures and biting wind makes inadequate outerwear a genuine hardship.",
        "Thermal layers underneath your regular clothing add significant warmth without bulk — a smart base layer investment that transforms any outfit into a winter one.",
        "Waterproof, insulated boots with proper grip are more important than stylish shoes when pavements can be icy or snow-covered.",
      ],
      packing: ["Heavy winter coat","Thermal base layers","Knitwear and jumpers","Insulated waterproof boots","Hat, scarf and gloves","Warm mid-layers"],
      occasions: ["dinner-party","concert","casual-outing","business-meeting"],
      faq: [
        { q: "How cold is continental winter — what coat do I need?", a: "Continental winters can be seriously cold — New York, Chicago, Seoul, and Berlin regularly see temperatures below -5°C (23°F). You need a coat rated for at least -10°C (14°F), or a combination of a heavy wool coat with thermal layers underneath. Don't underestimate it." },
        { q: "How do I look stylish in a continental winter without wearing a shapeless puffer?", a: "A long, tailored wool coat over quality knitwear is both warm and elegant. Add thermal base layers underneath your regular clothes for warmth without bulk. Invest in one excellent coat rather than several mediocre ones — it's what you'll wear every day." },
        { q: "What boots are best for icy continental winter streets?", a: "Insulated, waterproof boots with a rubber sole and actual traction are essential. Chelsea boots look great but can be slippery on ice. Look for boots with aggressive rubber soles — Sorel, Kamik, or UGG are reliable options for serious continental winter." },
      ],
    },
    spring: {
      intro: "Continental spring is one of the most exciting seasons to dress for — temperatures swing dramatically from near-freezing in March to pleasantly warm by May, with the energy of emerging from winter bringing a particular joy to spring dressing.",
      tips: [
        "Spring in a continental climate requires a full range of clothes — you'll need a warm coat for March but might be in light dresses or shirt-sleeves by May.",
        "The classic transitional layering approach: base layers, knitwear, and a coat or jacket that you can open up as the sun warms the day.",
        "Early spring is prime season for bright, optimistic colours — light pastels, fresh whites, and colour-blocked outfits signal the season and lift the mood after winter.",
      ],
      packing: ["Transitional coat (medium-weight)","Knitwear","Spring dresses or light trousers","Layer-friendly tops","Smart shoes or boots","Light scarf"],
      occasions: ["casual-outing","brunch","first-date","travel-day"],
      faq: [
        { q: "What is continental spring weather like?", a: "Continental spring (March–May) is highly variable. March can still feel like winter at 5–10°C (41–50°F), while May can be genuinely warm at 18–22°C (64–72°F). April is the classic transitional month. Pack layers that cover the full range." },
        { q: "What coat do I need for continental spring?", a: "A medium-weight coat — lighter than your winter coat but more substantial than a summer blazer — is the right choice for early-to-mid spring. A trench coat is the classic option: stylish, waterproof, and works across the spring temperature range." },
        { q: "When can I start wearing lighter clothing in continental spring?", a: "By late April and May, continental spring typically allows for lighter clothing on sunny days — light trousers, shirts without heavy layers, and spring dresses with a light jacket. Always check the forecast; spring in continental climates remains unpredictable." },
      ],
    },
    fall: {
      intro: "Continental autumn is the season that most rewards sophisticated dressing — temperatures from 8–18°C (46–64°F) with golden light, crisp air, and the full aesthetic richness of the season make it one of the most celebrated times for fashion.",
      tips: [
        "Autumn is the perfect time for quality outerwear investments — a well-cut wool coat or leather jacket worn over knitwear is the classic continental autumn formula.",
        "Earth tones, rich burgundies, and deep forest greens align beautifully with the season's aesthetic and the golden afternoon light of October.",
        "Layer textures as well as warmth: mixing smooth denim with chunky knitwear, or a silk blouse under a structured blazer, creates depth and visual interest.",
      ],
      packing: ["Wool coat or leather jacket","Knitwear","Ankle boots","Jeans and tailored trousers","Layering tops in warm tones","Scarf"],
      occasions: ["casual-outing","dinner-party","concert","business-meeting"],
      faq: [
        { q: "What is the signature continental autumn outfit?", a: "The definitive continental autumn look combines quality knitwear — a chunky roll-neck or fine merino cardigan — with well-fitted jeans or tailored trousers, a structured wool coat or leather jacket, and ankle or knee-high boots. Add a scarf and the look is complete." },
        { q: "When does it start feeling cold in continental autumn?", a: "In most continental cities, September still feels like late summer, October is the classic autumn transition, and November can feel close to winter. By October you'll want a coat for evenings, and by November it's coat-all-day weather in most continental cities." },
        { q: "What are the best colours for continental autumn dressing?", a: "Rich, warm tones dominate continental autumn dressing — camel, rust orange, burgundy, deep olive, and warm brown all work beautifully. These echo the autumn landscape and the warm-toned light of October afternoons. Navy and charcoal also work well as neutrals." },
      ],
    },
  },
  tropical: {
    summer: {
      intro: "Tropical climates are characterised by year-round warmth — 'summer' in a tropical destination means temperatures of 28–36°C (82–97°F) with high humidity and often a rainy season. Practical, quick-dry clothing in breathable fabrics is the foundation of tropical summer dressing.",
      tips: [
        "Moisture-wicking and quick-dry fabrics are the most important clothing technology for tropical summer — standard cotton absorbs sweat and stays damp uncomfortably in sustained high humidity.",
        "Light-coloured, loose-fitting clothing reflects heat and allows air circulation — avoid dark fabrics and tight silhouettes in intense tropical heat.",
        "A compact, packable rain jacket is more useful than an umbrella in tropical downpours — rainfall can be very heavy but typically brief during wet season months.",
      ],
      packing: ["Moisture-wicking tops and dresses","Lightweight loose trousers","Packable rain jacket","Quick-dry sandals","Breathable shoes","Sun hat"],
      occasions: ["casual-outing","beach-party","travel-day","brunch"],
      faq: [
        { q: "What clothes should I pack for tropical summer?", a: "Focus on lightweight, moisture-wicking fabrics in light colours. Linen, bamboo, and moisture-wicking synthetics are better choices than standard cotton. Pack loose silhouettes — fitted clothing becomes uncomfortable quickly in tropical humidity. A packable rain jacket is essential for wet season months." },
        { q: "How do I dress modestly in a tropical climate for temple visits?", a: "Most temples in tropical countries require covered shoulders and knees. A lightweight linen or cotton scarf or wrap worn over a sleeveless dress, or light cotton trousers, keeps you modest without adding meaningful heat. Many temples also provide wraps to borrow at the entrance." },
        { q: "What footwear is best for tropical summer?", a: "Comfortable sandals with proper support — not cheap flip-flops — are ideal for most tropical summer activities. Quick-dry sandals that can handle rain and wet conditions are particularly useful during wet season. For more formal occasions, lightweight leather sandals dress up any outfit." },
      ],
    },
    winter: {
      intro: "In a tropical climate, 'winter' is really just the dry, slightly cooler season — temperatures remain warm at 22–30°C (72–86°F), making it the most pleasant and popular time to visit. You'll still be dressing for warm weather, just without the peak humidity of the wet season.",
      tips: [
        "The dry season is the ideal time to visit tropical destinations — clear skies, lower humidity, and comfortable warmth require minimal wardrobe planning.",
        "A light cardigan or wrap for evenings and air-conditioned venues is the only concession to the 'winter' in a tropical climate.",
        "Smart casual resort wear works beautifully for the pleasant dry season temperatures — linen sets, light dresses, and breathable smart-casual pieces.",
      ],
      packing: ["Light summer wardrobe","One or two light evening layers","Resort-wear separates","Comfortable sandals","Light scarf or wrap"],
      occasions: ["casual-outing","brunch","dinner-party","beach-party"],
      faq: [
        { q: "What is tropical winter like — is it cold?", a: "Not at all. Tropical 'winter' refers to the dry season in many regions — temperatures stay comfortably warm at 22–30°C (72–86°F) with lower humidity and less rain. It's actually the best time to visit most tropical destinations." },
        { q: "What should I pack for tropical winter?", a: "Your standard summer wardrobe works perfectly. The only additions you might want are a light cardigan for heavily air-conditioned spaces, and possibly a light layer for evenings, which can feel pleasantly fresh after the heat of the day." },
        { q: "Is tropical winter good for beach activities?", a: "Tropical dry season (winter) is the ideal time for beach activities — calm seas, sunny skies, and reduced rainfall make it the best beach weather of the year in most tropical destinations." },
      ],
    },
    spring: {
      intro: "Spring in a tropical climate often marks the transition into the hot and humid season — temperatures begin climbing and humidity increases, making lightweight, breathable clothing even more important as the weeks progress.",
      tips: [
        "As humidity increases, prioritise moisture-wicking fabrics over standard cotton — the difference in comfort is significant in sustained tropical humidity.",
        "Light, flowing silhouettes allow air to circulate and keep you cooler than fitted or structured clothing in humid tropical conditions.",
        "Sun protection becomes increasingly important as the sun strengthens — a light long-sleeved layer in breathable fabric is both practical and respectful for cultural sites.",
      ],
      packing: ["Lightweight breathable dresses","Moisture-wicking separates","Light sun-protective layer","Sandals and breathable shoes","Wide-brim hat"],
      occasions: ["casual-outing","travel-day","brunch","beach-party"],
      faq: [
        { q: "What is tropical spring weather like?", a: "In most tropical regions, spring marks the transition from dry to wet season — temperatures climb towards their annual peak and humidity begins building. It's a shoulder season with a mix of dry sunny days and increasingly frequent rain." },
        { q: "Should I avoid visiting tropical destinations in spring?", a: "Not necessarily — early spring is still predominantly dry in many tropical regions, and the green season offers lower prices and fewer crowds. Pack a packable rain jacket and quick-dry clothing to handle both the dry and increasingly rainy days." },
        { q: "What's the best outfit for tropical spring activities?", a: "Lightweight, moisture-wicking separates — a breathable blouse or shirt with loose cotton or linen trousers — are ideal. Add a packable rain jacket and quick-dry sandals, and you're prepared for both the sunny mornings and afternoon showers that characterise tropical spring." },
      ],
    },
    fall: {
      intro: "Autumn in a tropical climate can mean monsoon season in many destinations — heavy rain, high humidity, and warm temperatures of 26–33°C (79–91°F) require practical, quick-dry clothing alongside your usual warm-weather wardrobe.",
      tips: [
        "Quick-dry fabrics become even more important during the rainy autumn months — you may get caught in a downpour, and the ability to dry quickly is a major comfort advantage.",
        "A compact packable rain jacket is more practical than an umbrella in strong tropical rain — a waterproof layer that folds into a bag pocket is the ideal tropical autumn accessory.",
        "Despite the rain, temperatures are still warm — light, breathable fabrics are still the right base, just with rain protection on standby.",
      ],
      packing: ["Quick-dry clothing throughout","Compact rain jacket","Waterproof sandals or shoes","Moisture-wicking fabrics","Light breathable layers"],
      occasions: ["casual-outing","travel-day","brunch"],
      faq: [
        { q: "Is tropical autumn (monsoon season) a bad time to visit?", a: "Not necessarily — monsoon season has real advantages: significantly fewer tourists, lower prices, and lush, green landscapes. Rain typically comes in heavy but brief afternoon showers rather than all-day drizzle. Pack waterproof gear and embrace the experience." },
        { q: "What should I wear in tropical monsoon season?", a: "Quick-dry fabrics are essential — you may get wet regardless of rain gear, and being able to dry quickly makes a significant difference. Waterproof sandals or shoes, a packable rain jacket, and moisture-wicking clothing form the core tropical monsoon wardrobe." },
        { q: "How do I protect my nice clothes from tropical monsoon rain?", a: "Use a dry bag or waterproof packing cubes in your daypack to keep spare clothing dry. Quick-dry fabrics also 'dry' faster between showers, giving you wearable clothes again within an hour of getting caught in a downpour." },
      ],
    },
  },
  subtropical: {
    summer: {
      intro: "Subtropical summers are hot and humid — temperatures reach 28–36°C (82–97°F) with high humidity that makes the heat feel more intense. The key challenge is navigating between outdoor heat and aggressively air-conditioned indoor spaces.",
      tips: [
        "Indoor air conditioning in subtropical summer cities is often set extremely cold — always carry a light layer for restaurants, offices, and shopping malls.",
        "Lightweight breathable fabrics like linen and moisture-wicking blends handle the outdoor heat, while a light cardigan handles the indoor temperature contrast.",
        "Stay fashion-forward with structured lightweight fabrics — subtropical summer fashion in style-conscious cities is an art form of looking polished without overheating.",
      ],
      packing: ["Light summer outfits","Cardigan for A/C (essential)","Breathable shoes","Light evening layer","Versatile smart-casual pieces"],
      occasions: ["casual-outing","brunch","dinner-party","business-meeting"],
      faq: [
        { q: "What fabrics work best for subtropical summer?", a: "Linen, breathable cotton, and moisture-wicking blends are the best choices. Subtropical humidity is slightly more manageable than tropical humidity, so quality linen — which breathes exceptionally well — is an excellent choice for both comfort and style." },
        { q: "Why is a light layer important in subtropical summer cities?", a: "Many subtropical summer cities — Hong Kong, Taipei, São Paulo — have extremely cold air conditioning in restaurants, malls, and offices. The temperature contrast between 32°C (90°F) outside and 18°C (64°F) inside can be shocking without a layer. A light blazer or cardigan in your bag is a subtropical summer essential." },
        { q: "How do style-conscious subtropical cities dress in summer?", a: "Cities like Hong Kong and Buenos Aires maintain a polished fashion culture even in summer. The answer is structured lightweight fabrics — a fitted linen blazer, smart cotton trousers, or an elegant silk blouse — that look intentional rather than hastily chosen for the heat." },
      ],
    },
    winter: {
      intro: "Subtropical winter brings the most comfortable temperatures — 12–19°C (54–66°F) with clear skies and low humidity. This is peak visiting season and the most flexible, comfortable time to dress for subtropical destinations.",
      tips: [
        "A mid-weight jacket or coat is sufficient for subtropical winter — you won't need the heavy coats of northern climates, but evenings can feel genuinely cool.",
        "Smart layering works perfectly: a light base, a knitwear piece, and a jacket gives you flexibility for comfortable days and cooler evenings.",
        "This is a wonderful time to dress with more structure and layering — the cool, dry air is perfect for wearing quality fabrics without overheating.",
      ],
      packing: ["Mid-weight jacket","Knitwear","Smart casual separates","Versatile shoes or boots","Light scarf"],
      occasions: ["casual-outing","dinner-party","brunch","concert"],
      faq: [
        { q: "What coat do I need for subtropical winter?", a: "A mid-weight jacket — a smart wool blazer, a light down jacket, or a structured coat — is appropriate for subtropical winter. You don't need the heavy-duty outerwear of a continental winter, but a light jacket alone won't be sufficient for evenings at 12°C (54°F)." },
        { q: "Is subtropical winter good for wearing more formal clothing?", a: "Absolutely — subtropical winter is the best season for more formal or structured clothing. The cooler temperatures allow you to wear quality fabrics — wool, structured cotton, silk — without overheating. It's the ideal season for smart business attire, event dressing, and elegant dinners." },
        { q: "What's the dress code for subtropical winter evenings?", a: "Smart casual to smart is appropriate for evening dining and events in most subtropical cities. A blazer or jacket over a nice shirt or dress, with trousers or a smart skirt and closed shoes, is the right level for most occasions." },
      ],
    },
    spring: {
      intro: "Subtropical spring transitions from the cool winter to increasingly warm and humid summer conditions — temperatures rise from 18–26°C (64–79°F) with building humidity as the season progresses. Early spring allows for more layering before the summer heat sets in.",
      tips: [
        "Early spring allows for more layering and richer fabrics — enjoy the variety before the summer heat establishes itself.",
        "By late spring, shift towards lighter fabrics and simpler silhouettes as temperatures and humidity rise noticeably.",
        "Versatile transitional pieces that work across the spring temperature range are smart investments — fabrics that feel good at both 18°C and 28°C (64–82°F).",
      ],
      packing: ["Transitional layers","Light jacket for early spring","Linen and cotton for late spring","Versatile footwear","Light scarves"],
      occasions: ["casual-outing","brunch","first-date","dinner-party"],
      faq: [
        { q: "What is subtropical spring weather like?", a: "Subtropical spring (March–May in the Northern Hemisphere) transitions from the comfortable winter into the hot, humid summer. March and April are often the most pleasant months — warm but not yet hot, with relatively low humidity. May starts to feel distinctly summery." },
        { q: "What's the transition strategy for subtropical spring dressing?", a: "Early spring (March–April): light layers work well — a blazer or light cardigan over a spring outfit. Late spring (May): shift towards single-layer lightweight fabrics and embrace summer dressing with an air-conditioning layer always in your bag." },
        { q: "Is subtropical spring good for travel?", a: "March and April are excellent times to visit most subtropical destinations — the weather is comfortable, humidity is manageable, and the summer crowds haven't fully arrived yet. It's a peak travel period for good reason." },
      ],
    },
    fall: {
      intro: "Subtropical autumn is a gradual easing from the hot, humid summer — temperatures cool from summer levels to the pleasant winter range of 20–28°C (68–82°F), with decreasing humidity through October and November. A rewarding season to visit.",
      tips: [
        "Early autumn is still very warm — keep summer wardrobe pieces in rotation until temperatures begin to ease noticeably.",
        "By October and November, you can start introducing layers and richer fabrics — this is an exciting fashion transition period in subtropical cities.",
        "The improving conditions through autumn make it a progressively more comfortable time to visit, with outfit options expanding week by week.",
      ],
      packing: ["Light summer outfits for early fall","Light jacket for evenings","Transitional layering pieces","Versatile footwear"],
      occasions: ["casual-outing","dinner-party","brunch","travel-day"],
      faq: [
        { q: "When does subtropical autumn start to feel comfortable?", a: "In most subtropical cities, September is still effectively summer. By mid-October, temperatures and humidity are noticeably more manageable. November is often the most pleasant transitional month, when you can start wearing layers again without overheating." },
        { q: "What should I pack for a subtropical autumn trip?", a: "For September–October, your summer wardrobe still applies with perhaps one light layer. For November onwards, a transitional coat or jacket, some knitwear, and autumn-weight fabrics become appropriate and comfortable." },
        { q: "Is autumn a good time to visit subtropical destinations?", a: "Yes, particularly October and November — the summer heat is easing, humidity is dropping, and the city comes alive after the summer slowdown. Many subtropical cities have their most exciting events, festivals, and restaurant openings in the autumn season." },
      ],
    },
  },
};
