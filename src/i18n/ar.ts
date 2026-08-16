import type { Dictionary } from "./en";

/**
 * Arabic (Modern Standard). Typed as `Dictionary`, so omitting any key the
 * English dictionary defines is a compile error.
 *
 * Counted phrases use all six CLDR plural categories Arabic distinguishes:
 * zero, one, two, few (3–10), many (11–99) and other (100+).
 */
export const ar: Dictionary = {
  // ---------- Announcement bar ----------
  "announce.text": "تخفيضات الصيف — خصم يصل إلى 40% على أجهزة مختارة.",
  "announce.cta": "تسوّق الآن",

  // ---------- Language switcher ----------
  "lang.switchLabel": "التبديل إلى الإنجليزية",
  "lang.switchName": "English",

  // ---------- Theme switcher ----------
  "theme.toDark": "التبديل إلى الوضع الداكن",
  "theme.toLight": "التبديل إلى الوضع الفاتح",

  // ---------- Navigation ----------
  "nav.toggleMenu": "فتح القائمة",
  "nav.home": "الرئيسية",
  "nav.shop": "المتجر",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "nav.signup": "إنشاء حساب",
  "nav.searchPlaceholder": "عمّ تبحث؟",
  "nav.searchLabel": "البحث عن المنتجات",
  "nav.searchSubmit": "بحث",
  "nav.wishlistLabel": {
    zero: "المفضلة، لا توجد منتجات",
    one: "المفضلة، منتج واحد",
    two: "المفضلة، منتجان",
    few: "المفضلة، {count} منتجات",
    many: "المفضلة، {count} منتجًا",
    other: "المفضلة، {count} منتج",
  },
  "nav.cartLabel": {
    zero: "السلة، لا توجد منتجات",
    one: "السلة، منتج واحد",
    two: "السلة، منتجان",
    few: "السلة، {count} منتجات",
    many: "السلة، {count} منتجًا",
    other: "السلة، {count} منتج",
  },
  "nav.accountLabel": "الحساب",

  // ---------- Shared actions ----------
  "action.addToCart": "أضف إلى السلة",
  "action.addToCartLong": "أضف إلى السلة",
  "action.added": "✓ تمت الإضافة إلى السلة",
  "action.soldOut": "نفدت الكمية",
  "action.viewAll": "عرض الكل",
  "action.buyNow": "اشترِ الآن!",
  "action.shopNow": "تسوّق الآن",
  "action.remove": "إزالة",
  "action.decrease": "إنقاص",
  "action.increase": "زيادة",
  "action.quantityLabel": "محدّد الكمية",
  "action.toggleWishlist": "إضافة إلى المفضلة أو إزالتها",
  "action.addToWishlist": "أضف إلى المفضلة",
  "action.removeFromWishlist": "إزالة من المفضلة",
  "action.quickView": "عرض سريع",
  "action.closeQuickView": "إغلاق العرض السريع",
  "action.viewFullDetails": "عرض التفاصيل كاملة",
  "action.backHome": "العودة إلى الرئيسية",
  "action.tryAgain": "إعادة المحاولة",

  // ---------- Product ----------
  "product.new": "جديد",
  "product.saleBadge": "-{discount}%",
  "product.save": "وفّر {discount}%",
  "product.inStock": "متوفر",
  "product.outOfStock": "غير متوفر",
  "product.ratingLabel": "التقييم {rating} من 5",
  "product.related": "قد يعجبك أيضًا",
  "product.perkShipping": "🚚 شحن مجاني خلال 48 ساعة",
  "product.perkReturns": "↩️ إرجاع خلال 30 يومًا",
  "product.perkSecure": "🔒 دفع آمن",

  // ---------- Categories ----------
  "category.Electronics": "إلكترونيات",
  "category.Fashion": "أزياء",
  "category.Home": "المنزل",
  "category.Beauty": "الجمال",
  "category.Sports": "الرياضة",
  "category.Electronics.blurb": "أجهزة وصوتيات",
  "category.Fashion.blurb": "أناقة كل موسم",
  "category.Home.blurb": "راحة وديكور",
  "category.Beauty.blurb": "أساسيات الإشراق",
  "category.Sports.blurb": "تحرّك أكثر",

  // ---------- Hero ----------
  "hero.eyebrow": "🔥 تخفيضات الصيف — خصم يصل إلى 40%",
  "hero.titleLead": "عروض كبيرة على التقنية التي",
  "hero.titleAccent": "تحبها",
  "hero.sub":
    "تسوّق السماعات والأجهزة القابلة للارتداء والكاميرات والمزيد من أفضل العلامات التجارية — مع توصيل مجاني خلال 48 ساعة وإرجاع سهل خلال 30 يومًا.",
  "hero.artLabel": "فقاعات منتجات متحركة",
  "hero.statProducts": "منتج",
  "hero.statRating": "متوسط التقييم",
  "hero.statDelivery": "للتوصيل",
  "hero.statDeliveryValue": "48 ساعة",

  // ---------- Home ----------
  "home.categoriesEyebrow": "الفئات",
  "home.categoriesTitle": "تصفّح حسب الفئة",
  "home.featuredEyebrow": "هذا الشهر",
  "home.featuredTitle": "أبرز العروض",
  "home.exploreEyebrow": "منتجاتنا",
  "home.exploreTitle": "استكشف منتجاتنا",
  "home.promoEyebrow": "الفئات",
  "home.promoTitle": "ارتقِ بتجربتك الموسيقية",
  "home.promoText":
    "أجهزة صوتية فاخرة بأسعار مخفّضة هذا الأسبوع فقط. لا تفوّت هذه العروض.",
  "home.metaDescription":
    "شوب ويف — متجر إلكتروني عصري ومتجاوب للأجهزة والأزياء والمزيد.",

  // ---------- Benefits ----------
  "benefit.deliveryTitle": "توصيل مجاني وسريع",
  "benefit.deliveryText": "توصيل مجاني لكل الطلبات فوق 50 دولارًا.",
  "benefit.deliveryTextLong":
    "توصيل مجاني لكل الطلبات فوق 50 دولارًا، خلال 48 ساعة.",
  "benefit.supportTitle": "خدمة عملاء على مدار الساعة",
  "benefit.supportText": "دعم ودود في أي وقت وأي يوم.",
  "benefit.supportTextLong": "دعم بشري ودود على مدار الساعة طوال أيام الأسبوع.",
  "benefit.guaranteeTitle": "ضمان استرداد الأموال",
  "benefit.guaranteeText": "إرجاع خلال 30 يومًا دون أي أسئلة.",
  "benefit.guaranteeTextLong":
    "غير راضٍ؟ أرجِع أي منتج خلال 30 يومًا دون أي أسئلة.",
  "benefit.secureTitle": "مدفوعات آمنة",
  "benefit.secureText": "دفع مشفّر وحماية للمشتري.",

  // ---------- Shop ----------
  "shop.allProducts": "كل المنتجات",
  "shop.all": "الكل",
  "shop.sort": "ترتيب",
  "shop.sortFeatured": "المميزة",
  "shop.sortPriceAsc": "السعر: من الأقل إلى الأعلى",
  "shop.sortPriceDesc": "السعر: من الأعلى إلى الأقل",
  "shop.sortRating": "الأعلى تقييمًا",
  "shop.resultsFor": "نتائج البحث عن «{query}»",
  "shop.itemCount": {
    zero: "لا توجد منتجات",
    one: "منتج واحد",
    two: "منتجان",
    few: "{count} منتجات",
    many: "{count} منتجًا",
    other: "{count} منتج",
  },
  "shop.loading": "جارٍ تحميل المنتجات…",
  "shop.loadingLabel": "جارٍ تحميل المنتجات",
  "shop.emptyTitle": "لا توجد منتجات",
  "shop.emptyText": "جرّب فئة أخرى أو كلمة بحث مختلفة.",
  "shop.searchTitle": "بحث: {query}",

  // ---------- Cart ----------
  "cart.title": "سلة التسوّق",
  "cart.titleWithCount": "السلة ({count})",
  "cart.inYourCart": {
    zero: "سلتك فارغة",
    one: "منتج واحد في سلتك",
    two: "منتجان في سلتك",
    few: "{count} منتجات في سلتك",
    many: "{count} منتجًا في سلتك",
    other: "{count} منتج في سلتك",
  },
  "cart.emptyTitle": "سلتك فارغة",
  "cart.emptyText": "يبدو أنك لم تضف أي شيء بعد.",
  "cart.emptyCta": "ابدأ التسوّق",
  "cart.emptyBagLabel": "حقيبة تسوّق فارغة",
  "cart.summaryTitle": "ملخّص الطلب",
  "cart.freeShippingProgress": "أضف {amount} للحصول على شحن مجاني.",
  "cart.freeShippingUnlocked": "🎉 حصلت على الشحن المجاني!",
  "cart.subtotal": "المجموع الفرعي",
  "cart.shipping": "الشحن",
  "cart.free": "مجاني",
  "cart.total": "الإجمالي",
  "cart.checkout": "إتمام الشراء",
  "cart.continueShopping": "متابعة التسوّق",

  // ---------- Checkout ----------
  "checkout.title": "إتمام الشراء",
  "checkout.contact": "بيانات التواصل",
  "checkout.email": "البريد الإلكتروني",
  "checkout.shippingAddress": "عنوان الشحن",
  "checkout.firstName": "الاسم الأول",
  "checkout.lastName": "اسم العائلة",
  "checkout.address": "العنوان",
  "checkout.city": "المدينة",
  "checkout.postalCode": "الرمز البريدي",
  "checkout.payment": "الدفع",
  "checkout.cardNumber": "رقم البطاقة",
  "checkout.expiry": "تاريخ الانتهاء",
  "checkout.cvc": "رمز التحقق",
  "checkout.demoNote": "هذا متجر تجريبي — لا تتم معالجة أي دفعات حقيقية.",
  "checkout.pay": "ادفع {total}",
  "checkout.yourOrder": "طلبك",
  "checkout.successTitle": "شكرًا لك على طلبك!",
  "checkout.successText":
    "تم تأكيد طلبك {orderId}. سيصلك الإيصال على بريدك الإلكتروني.",
  "checkout.successLabel": "تم تأكيد الطلب",
  "checkout.continueShopping": "متابعة التسوّق",
  "checkout.emptyTitle": "لا شيء لإتمام شرائه",
  "checkout.emptyText": "أضف بعض المنتجات إلى سلتك أولًا.",
  "checkout.emptyCta": "تصفّح المنتجات",
  "checkout.placeholderEmail": "you@example.com",
  "checkout.placeholderFirst": "أحمد",
  "checkout.placeholderLast": "منصور",
  "checkout.placeholderAddress": "123 شارع السوق",
  "checkout.placeholderCity": "القاهرة",
  "checkout.placeholderZip": "11511",
  "checkout.placeholderExpiry": "شهر / سنة",

  // ---------- Wishlist ----------
  "wishlist.title": "المفضلة",
  "wishlist.titleWithCount": "المفضلة ({count})",
  "wishlist.saved": {
    zero: "لا توجد منتجات محفوظة",
    one: "منتج واحد محفوظ",
    two: "منتجان محفوظان",
    few: "{count} منتجات محفوظة",
    many: "{count} منتجًا محفوظًا",
    other: "{count} منتج محفوظ",
  },
  "wishlist.moveAll": "نقل الكل إلى السلة",
  "wishlist.clearAll": "مسح الكل",
  "wishlist.emptyTitle": "قائمة مفضلتك فارغة",
  "wishlist.emptyText": "اضغط على القلب في أي منتج لحفظه هنا.",
  "wishlist.emptyCta": "استكشف المنتجات",
  "wishlist.emptyLabel": "قائمة مفضلة فارغة",

  // ---------- About ----------
  "about.title": "من نحن",
  "about.heading": "قصتنا",
  "about.p1":
    "انطلقت شوب ويف عام 2021 كسوق إلكتروني سريع النمو، برسالة واحدة: أن تكون المنتجات الرائعة في متناول الجميع. نجمع آلاف البائعين والمتسوّقين حول فكرة بسيطة — التسوّق يجب أن يكون تجربة ممتعة.",
  "about.p2":
    "توفّر شوب ويف اليوم أكثر من مليون منتج في الإلكترونيات والأزياء والمنزل والجمال والرياضة — يدعمها فريق مهووس بالسرعة والخدمة والتصميم.",
  "about.metaDescription": "قصة شوب ويف — سوق إلكتروني قائم على السرعة والخدمة والتصميم.",
  "about.statSellers": "بائع نشط على موقعنا",
  "about.statSales": "مبيعات شهرية من المنتجات",
  "about.statCustomers": "عميل نشط على موقعنا",
  "about.statGross": "إجمالي المبيعات السنوية على موقعنا",

  // ---------- Contact ----------
  "contact.title": "اتصل بنا",
  "contact.metaDescription": "تواصل مع فريق دعم شوب ويف على مدار الساعة.",
  "contact.callTitle": "اتصل بنا",
  "contact.callText": "نحن متاحون على مدار الساعة طوال أيام الأسبوع.",
  "contact.phone": "الهاتف: ‎+20 100 123 4567",
  "contact.writeTitle": "راسلنا",
  "contact.writeText": "املأ النموذج وسنردّ عليك خلال 24 ساعة.",
  "contact.placeholderName": "اسمك *",
  "contact.placeholderEmail": "بريدك الإلكتروني *",
  "contact.placeholderPhone": "رقم هاتفك *",
  "contact.placeholderMessage": "رسالتك *",
  "contact.labelName": "اسمك",
  "contact.labelEmail": "بريدك الإلكتروني",
  "contact.labelPhone": "رقم هاتفك",
  "contact.labelMessage": "رسالتك",
  "contact.send": "إرسال الرسالة",
  "contact.sent": "✓ تم إرسال الرسالة — شكرًا لك!",

  // ---------- Auth ----------
  "auth.loginTitle": "تسجيل الدخول إلى شوب ويف",
  "auth.loginPageTitle": "تسجيل الدخول",
  "auth.signupTitle": "إنشاء حساب",
  "auth.subtitle": "أدخل بياناتك أدناه",
  "auth.emailOrPhone": "البريد الإلكتروني أو رقم الهاتف",
  "auth.password": "كلمة المرور",
  "auth.name": "الاسم",
  "auth.logIn": "تسجيل الدخول",
  "auth.createAccount": "إنشاء الحساب",
  "auth.googleSignup": "التسجيل عبر Google",
  "auth.forgot": "نسيت كلمة المرور؟",
  "auth.noAccount": "ليس لديك حساب؟",
  "auth.haveAccount": "لديك حساب بالفعل؟",
  "auth.signUpLink": "أنشئ حسابًا",
  "auth.logInLink": "سجّل الدخول",
  "auth.loginDemoNote": "✓ هذه نسخة تجريبية — اربط هذا النموذج بنظام المصادقة لديك.",
  "auth.signupDemoNote": "✓ هذه نسخة تجريبية — اربط هذا النموذج بنظام التسجيل لديك.",

  // ---------- 404 ----------
  "notFound.title": "الصفحة غير موجودة",
  "notFound.heading": "404 — الصفحة غير موجودة",
  "notFound.text": "يبدو أن الصفحة التي تبحث عنها قد اختفت.",

  // ---------- Error boundary ----------
  "error.title": "حدث خطأ ما",
  "error.text": "منع خطأ غير متوقع عرض هذه الصفحة. عادةً ما يحل تحديث الصفحة المشكلة.",

  // ---------- Footer ----------
  "footer.blurb":
    "منتجات مختارة بعناية لحياة يومية أفضل. شحن سريع ومجاني للطلبات فوق 50 دولارًا.",
  "footer.socialLabel": "روابط التواصل الاجتماعي",
  "footer.shop": "المتجر",
  "footer.allProducts": "كل المنتجات",
  "footer.company": "الشركة",
  "footer.aboutUs": "من نحن",
  "footer.careers": "الوظائف",
  "footer.sustainability": "الاستدامة",
  "footer.press": "الصحافة",
  "footer.support": "الدعم",
  "footer.helpCenter": "مركز المساعدة",
  "footer.shipping": "الشحن",
  "footer.returns": "الإرجاع",
  "footer.newsletterTitle": "انضم إلى الموجة",
  "footer.newsletterText": "احصل على خصم 10% على أول طلب ووصول مبكر للمنتجات الجديدة.",
  "footer.emailPlaceholder": "البريد الإلكتروني",
  "footer.subscribe": "اشتراك",
  "footer.newsletterOk": "✓ تم اشتراكك — تفقّد بريدك الإلكتروني.",
  "footer.followOn": "شوب ويف على {network}",
  "footer.paymentsLabel": "نقبل الدفع عبر",
  "footer.legalLabel": "الشؤون القانونية",
  "footer.privacy": "سياسة الخصوصية",
  "footer.terms": "شروط الخدمة",
  "footer.cookies": "إعدادات ملفات الارتباط",
  "footer.rights": "© {year} شوب ويف. جميع الحقوق محفوظة.",
  "footer.builtWith": "مبني باستخدام React وTypeScript وLottie.",

  // ---------- Breadcrumbs / misc ----------
  "crumbs.label": "مسار التنقّل",
  "crumbs.home": "الرئيسية",
  "meta.defaultTitle": "شوب ويف — متجر إلكتروني عصري",
};
