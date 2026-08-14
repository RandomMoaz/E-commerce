/**
 * Arabic copy for the catalogue, keyed by the canonical product id in
 * `src/data/products.ts`. The English entry stays the source of truth for
 * everything non-textual (price, rating, image, stock), so a product only ever
 * needs its words translated here.
 *
 * Coverage is checked at runtime in dev (see `LocaleProvider`), which warns for
 * any product id missing Arabic copy. Untranslated products fall back to their
 * English text rather than rendering blank.
 */
export interface ProductText {
  name: string;
  brand: string;
  description: string;
  tags: string[];
}

export const productsAr = {
  "aurora-headphones": {
    name: "سماعات أورورا اللاسلكية",
    brand: "سونيك",
    description:
      "سماعات محيطة بالأذن بخاصية إلغاء الضجيج النشط، ببطارية تدوم 40 ساعة ووسائد إسفنجية طرية ومشغّلات صوت باحترافية الاستوديو، مضبوطة لصوت جهير عميق ونغمات عالية نقية.",
    tags: ["إلغاء الضجيج", "بطارية 40 ساعة", "بلوتوث 5.3"],
  },
  "pulse-smartwatch": {
    name: "ساعة بالس الذكية — الإصدار السادس",
    brand: "سونيك",
    description:
      "تابع تمارينك ونومك ومعدل ضربات قلبك على شاشة AMOLED زاهية تعمل دائمًا. مقاومة للماء حتى 50 مترًا، ببطارية تدوم 7 أيام وأكثر من 120 وضعًا رياضيًا.",
    tags: ["شاشة AMOLED", "تحديد المواقع", "بطارية 7 أيام"],
  },
  "nimbus-sneakers": {
    name: "حذاء نيمبوس للجري",
    brand: "سترايف",
    description:
      "حذاء رياضي خفيف الوزن بنعل أوسط من الرغوة سريعة الاستجابة، وسطح علوي محبوك يسمح بمرور الهواء ليبقيك منتعشًا ميلًا بعد ميل.",
    tags: ["خفيف الوزن", "جيد التهوية", "مبطّن"],
  },
  "linen-overshirt": {
    name: "قميص كوستال الكتاني",
    brand: "ماريه",
    description:
      "قميص خارجي بقَصّة مريحة من الكتان الأوروبي القابل للتنفّس. ارتدِه مفتوحًا أو مغلقًا — أناقة عفوية من الشاطئ إلى المدينة.",
    tags: ["كتان 100%", "قَصّة مريحة"],
  },
  "terra-mug-set": {
    name: "طقم أكواب تيرا الفخارية",
    brand: "كاسا",
    description:
      "طقم من أربعة أكواب فخارية مطلية يدويًا. كل قطعة فريدة بلمسة مختلفة، آمنة في الميكروويف وغسالة الصحون، ومصنوعة لصباحات هادئة.",
    tags: ["طقم من 4", "صناعة يدوية", "آمن في غسالة الصحون"],
  },
  "lumen-serum": {
    name: "سيروم لومن بفيتامين سي",
    brand: "جلو",
    description:
      "سيروم مُشرِق بتركيز 15% من فيتامين سي مع حمض الهيالورونيك، يوحّد لون البشرة ويخفّف الخطوط الدقيقة ويمنحها نضارة دون أي لزوجة.",
    tags: ["15% فيتامين سي", "هيالورونيك", "نباتي"],
  },
  "orbit-speaker": {
    name: "مكبر صوت أوربت المحمول",
    brand: "سونيك",
    description:
      "صوت محيطي 360 درجة يملأ الغرفة في جسم صغير بحجم الجيب ومقاوم للماء بمعيار IP67. عشرون ساعة من التشغيل وحزام يُعلَّق أينما ذهبت.",
    tags: ["صوت 360 درجة", "مقاوم للماء", "20 ساعة"],
  },
  "cloud-throw": {
    name: "بطانية كلاود المحبوكة",
    brand: "كاسا",
    description:
      "بطانية كبيرة بحياكة سميكة من الشنيل الناعم كالزبدة، تنسدل بجمال على أي أريكة أو سرير. دفء تغرق فيه.",
    tags: ["قماش الشنيل", "مقاس كبير"],
  },
  "trail-backpack": {
    name: "حقيبة تريل اليومية 24 لترًا",
    brand: "سترايف",
    description:
      "حقيبة يومية سعة 24 لترًا تتحمّل تقلّبات الطقس، بجيب مبطّن للحاسوب المحمول ومنفذ للترطيب وظهر مهوّى — لتنقّلات المدينة ومسارات نهاية الأسبوع معًا.",
    tags: ["24 لترًا", "مقاومة للماء", "جيب للحاسوب"],
  },
  "solene-sunglasses": {
    name: "نظارة سولين الشمسية المستقطبة",
    brand: "ماريه",
    description:
      "إطارات أسيتات كلاسيكية بعدسات مستقطبة بحماية UV400 تقلّل الوهج وتزيد نقاء الألوان. تأتي مع علبة صلبة وقطعة تنظيف.",
    tags: ["عدسات مستقطبة", "حماية UV400"],
  },
  "velvet-lip": {
    name: "ثلاثية فيلفيت لأحمر الشفاه المطفي",
    brand: "جلو",
    description:
      "ثلاثة ألوان لأحمر شفاه مطفي طويل الثبات، غنية بزبدة الشيا لملمس ناعم وخفيف يدوم طوال اليوم.",
    tags: ["طقم من 3", "ثبات طويل"],
  },
  "focus-lamp": {
    name: "مصباح فوكس LED للمكتب",
    brand: "كاسا",
    description:
      "مصباح مكتبي بسيط من الألمنيوم بإضاءة قابلة للخفت تدريجيًا وثلاث درجات لونية ومنفذ شحن USB-C مدمج — لمكتب مرتّب.",
    tags: ["قابل للخفت", "منفذ USB-C", "3 درجات لونية"],
  },
} satisfies Record<string, ProductText>;

export type LocalizedProductId = keyof typeof productsAr;
