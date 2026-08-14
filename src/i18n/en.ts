import type { Phrase } from "./types";

/**
 * The English dictionary is the source of truth: its keys define
 * `TranslationKey`, so every other locale must supply all of them or the build
 * fails. Values are either a plain string or a plural object keyed by CLDR
 * category (selected via the `count` variable).
 *
 * Placeholders use `{name}` and are filled from the `vars` argument to `t()`.
 */
export const en = {
  // ---------- Announcement bar ----------
  "announce.text": "Summer sale — up to 40% off selected tech.",
  "announce.cta": "Shop Now",

  // ---------- Language switcher ----------
  "lang.switchLabel": "Switch to Arabic",
  "lang.switchName": "العربية",

  // ---------- Navigation ----------
  "nav.toggleMenu": "Toggle menu",
  "nav.home": "Home",
  "nav.shop": "Shop",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.signup": "Sign Up",
  "nav.searchPlaceholder": "What are you looking for?",
  "nav.searchLabel": "Search products",
  "nav.searchSubmit": "Search",
  "nav.wishlistLabel": {
    one: "Wishlist, {count} item",
    other: "Wishlist, {count} items",
  },
  "nav.cartLabel": {
    one: "Cart, {count} item",
    other: "Cart, {count} items",
  },
  "nav.accountLabel": "Account",

  // ---------- Shared actions ----------
  "action.addToCart": "Add To Cart",
  "action.addToCartLong": "Add to cart",
  "action.added": "✓ Added to cart",
  "action.soldOut": "Sold out",
  "action.viewAll": "View all",
  "action.buyNow": "Buy Now!",
  "action.shopNow": "Shop Now",
  "action.remove": "Remove",
  "action.decrease": "Decrease",
  "action.increase": "Increase",
  "action.quantityLabel": "Quantity selector",
  "action.toggleWishlist": "Toggle wishlist",
  "action.addToWishlist": "Add to wishlist",
  "action.removeFromWishlist": "Remove from wishlist",
  "action.quickView": "Quick view",
  "action.closeQuickView": "Close quick view",
  "action.viewFullDetails": "View full details",
  "action.backHome": "Back home",
  "action.tryAgain": "Try again",

  // ---------- Product ----------
  "product.new": "New",
  "product.saleBadge": "-{discount}%",
  "product.save": "Save {discount}%",
  "product.inStock": "In stock",
  "product.outOfStock": "Out of stock",
  "product.ratingLabel": "Rated {rating} out of 5",
  "product.related": "You might also like",
  "product.perkShipping": "🚚 Free 48h shipping",
  "product.perkReturns": "↩️ 30-day returns",
  "product.perkSecure": "🔒 Secure checkout",

  // ---------- Categories ----------
  "category.Electronics": "Electronics",
  "category.Fashion": "Fashion",
  "category.Home": "Home",
  "category.Beauty": "Beauty",
  "category.Sports": "Sports",
  "category.Electronics.blurb": "Gadgets & audio",
  "category.Fashion.blurb": "Wear the season",
  "category.Home.blurb": "Comfort & decor",
  "category.Beauty.blurb": "Glow essentials",
  "category.Sports.blurb": "Move more",

  // ---------- Hero ----------
  "hero.eyebrow": "🔥 Summer Sale — up to 40% off",
  "hero.titleLead": "Big deals on the tech you",
  "hero.titleAccent": "love",
  "hero.sub":
    "Shop headphones, wearables, cameras and more from top brands — with free 48-hour delivery and easy 30-day returns.",
  "hero.artLabel": "Floating product bubbles",
  "hero.statProducts": "products",
  "hero.statRating": "avg rating",
  "hero.statDelivery": "delivery",
  "hero.statDeliveryValue": "48h",

  // ---------- Home ----------
  "home.categoriesEyebrow": "Categories",
  "home.categoriesTitle": "Browse by category",
  "home.featuredEyebrow": "This month",
  "home.featuredTitle": "Featured deals",
  "home.exploreEyebrow": "Our products",
  "home.exploreTitle": "Explore our products",
  "home.promoEyebrow": "Categories",
  "home.promoTitle": "Enhance your music experience",
  "home.promoText":
    "Premium audio gear on sale this week only. Don't wave goodbye to these deals.",
  "home.metaDescription":
    "ShopWave — a modern, responsive online store for gadgets, apparel, and more.",

  // ---------- Benefits ----------
  "benefit.deliveryTitle": "Free & fast delivery",
  "benefit.deliveryText": "Free delivery for all orders over $50.",
  "benefit.deliveryTextLong":
    "Free delivery for all orders over $50, delivered within 48 hours.",
  "benefit.supportTitle": "24/7 customer service",
  "benefit.supportText": "Friendly support, any time, any day.",
  "benefit.supportTextLong": "Friendly, round-the-clock support from real humans.",
  "benefit.guaranteeTitle": "Money-back guarantee",
  "benefit.guaranteeText": "30-day no-questions-asked returns.",
  "benefit.guaranteeTextLong":
    "Not happy? Return any item within 30 days, no questions asked.",
  "benefit.secureTitle": "Secure payments",
  "benefit.secureText": "Encrypted checkout & buyer protection.",

  // ---------- Shop ----------
  "shop.allProducts": "All products",
  "shop.all": "All",
  "shop.sort": "Sort",
  "shop.sortFeatured": "Featured",
  "shop.sortPriceAsc": "Price: low to high",
  "shop.sortPriceDesc": "Price: high to low",
  "shop.sortRating": "Top rated",
  "shop.resultsFor": "Results for “{query}”",
  "shop.itemCount": {
    one: "{count} item",
    other: "{count} items",
  },
  "shop.loading": "Loading products…",
  "shop.loadingLabel": "Loading products",
  "shop.emptyTitle": "No products found",
  "shop.emptyText": "Try a different category or search term.",
  "shop.searchTitle": "Search: {query}",

  // ---------- Cart ----------
  "cart.title": "Shopping cart",
  "cart.titleWithCount": "Cart ({count})",
  "cart.inYourCart": {
    one: "{count} item in your cart",
    other: "{count} items in your cart",
  },
  "cart.emptyTitle": "Your cart is empty",
  "cart.emptyText": "Looks like you haven’t added anything yet.",
  "cart.emptyCta": "Start shopping",
  "cart.emptyBagLabel": "Empty shopping bag",
  "cart.summaryTitle": "Order summary",
  "cart.freeShippingProgress": "Add {amount} more for free shipping.",
  "cart.freeShippingUnlocked": "🎉 You’ve unlocked free shipping!",
  "cart.subtotal": "Subtotal",
  "cart.shipping": "Shipping",
  "cart.free": "Free",
  "cart.total": "Total",
  "cart.checkout": "Checkout",
  "cart.continueShopping": "Continue shopping",

  // ---------- Checkout ----------
  "checkout.title": "Checkout",
  "checkout.contact": "Contact",
  "checkout.email": "Email",
  "checkout.shippingAddress": "Shipping address",
  "checkout.firstName": "First name",
  "checkout.lastName": "Last name",
  "checkout.address": "Address",
  "checkout.city": "City",
  "checkout.postalCode": "Postal code",
  "checkout.payment": "Payment",
  "checkout.cardNumber": "Card number",
  "checkout.expiry": "Expiry",
  "checkout.cvc": "CVC",
  "checkout.demoNote": "This is a demo store — no real payment is processed.",
  "checkout.pay": "Pay {total}",
  "checkout.yourOrder": "Your order",
  "checkout.successTitle": "Thank you for your order!",
  "checkout.successText":
    "Your order {orderId} is confirmed. A receipt is on its way to your inbox.",
  "checkout.successLabel": "Order confirmed",
  "checkout.continueShopping": "Continue shopping",
  "checkout.emptyTitle": "Nothing to check out",
  "checkout.emptyText": "Add a few items to your cart first.",
  "checkout.emptyCta": "Browse products",
  "checkout.placeholderEmail": "you@example.com",
  "checkout.placeholderFirst": "Jamie",
  "checkout.placeholderLast": "Rivera",
  "checkout.placeholderAddress": "123 Market Street",
  "checkout.placeholderCity": "Cairo",
  "checkout.placeholderZip": "11511",
  "checkout.placeholderExpiry": "MM / YY",

  // ---------- Wishlist ----------
  "wishlist.title": "Wishlist",
  "wishlist.titleWithCount": "Wishlist ({count})",
  "wishlist.saved": {
    one: "{count} saved item",
    other: "{count} saved items",
  },
  "wishlist.moveAll": "Move all to cart",
  "wishlist.clearAll": "Clear all",
  "wishlist.emptyTitle": "Your wishlist is empty",
  "wishlist.emptyText": "Tap the heart on any product to save it here.",
  "wishlist.emptyCta": "Explore products",
  "wishlist.emptyLabel": "Empty wishlist",

  // ---------- About ----------
  "about.title": "About us",
  "about.heading": "Our Story",
  "about.p1":
    "Launched in 2021, ShopWave is a fast-growing marketplace on a mission to make great products accessible to everyone. We connect thousands of sellers and shoppers around a simple idea: shopping should feel good.",
  "about.p2":
    "Today ShopWave offers more than 1 million products across electronics, fashion, home, beauty and sports — supported by a team obsessed with speed, service, and design.",
  "about.metaDescription":
    "The ShopWave story — a marketplace built around speed, service and design.",
  "about.statSellers": "Sellers active on our site",
  "about.statSales": "Monthly product sales",
  "about.statCustomers": "Customers active on our site",
  "about.statGross": "Annual gross sale on our site",

  // ---------- Contact ----------
  "contact.title": "Contact",
  "contact.metaDescription": "Get in touch with the ShopWave support team, 24/7.",
  "contact.callTitle": "Call to us",
  "contact.callText": "We are available 24/7, 7 days a week.",
  "contact.phone": "Phone: +20 100 123 4567",
  "contact.writeTitle": "Write to us",
  "contact.writeText": "Fill out the form and we'll respond within 24 hours.",
  "contact.placeholderName": "Your name *",
  "contact.placeholderEmail": "Your email *",
  "contact.placeholderPhone": "Your phone *",
  "contact.placeholderMessage": "Your message *",
  "contact.labelName": "Your name",
  "contact.labelEmail": "Your email",
  "contact.labelPhone": "Your phone",
  "contact.labelMessage": "Your message",
  "contact.send": "Send message",
  "contact.sent": "✓ Message sent — thank you!",

  // ---------- Auth ----------
  "auth.loginTitle": "Log in to ShopWave",
  "auth.loginPageTitle": "Log in",
  "auth.signupTitle": "Create an account",
  "auth.subtitle": "Enter your details below",
  "auth.emailOrPhone": "Email or phone number",
  "auth.password": "Password",
  "auth.name": "Name",
  "auth.logIn": "Log In",
  "auth.createAccount": "Create Account",
  "auth.googleSignup": "Sign up with Google",
  "auth.forgot": "Forgot password?",
  "auth.noAccount": "Don't have an account?",
  "auth.haveAccount": "Already have an account?",
  "auth.signUpLink": "Sign up",
  "auth.logInLink": "Log in",
  "auth.loginDemoNote": "✓ This is a demo — hook this form up to your auth backend.",
  "auth.signupDemoNote": "✓ This is a demo — connect this form to your sign-up backend.",

  // ---------- 404 ----------
  "notFound.title": "Page not found",
  "notFound.heading": "404 — page not found",
  "notFound.text": "The page you’re looking for has wandered off.",

  // ---------- Error boundary ----------
  "error.title": "Something went wrong",
  "error.text":
    "An unexpected error stopped this page from rendering. Reloading usually fixes it.",

  // ---------- Footer ----------
  "footer.blurb":
    "Thoughtfully curated products for a better everyday. Fast, free shipping on orders over $50.",
  "footer.socialLabel": "Social links",
  "footer.shop": "Shop",
  "footer.allProducts": "All products",
  "footer.company": "Company",
  "footer.aboutUs": "About us",
  "footer.careers": "Careers",
  "footer.sustainability": "Sustainability",
  "footer.press": "Press",
  "footer.support": "Support",
  "footer.helpCenter": "Help center",
  "footer.shipping": "Shipping",
  "footer.returns": "Returns",
  "footer.newsletterTitle": "Join the wave",
  "footer.newsletterText": "Get 10% off your first order and early access to drops.",
  "footer.emailPlaceholder": "Email address",
  "footer.subscribe": "Subscribe",
  "footer.rights": "© {year} ShopWave. All rights reserved.",
  "footer.builtWith": "Built with React, TypeScript & Lottie.",

  // ---------- Breadcrumbs / misc ----------
  "crumbs.label": "Breadcrumb",
  "crumbs.home": "Home",
  "meta.defaultTitle": "ShopWave — Modern Online Store",
} satisfies Record<string, Phrase>;

/** Every valid translation key, derived from the English dictionary. */
export type TranslationKey = keyof typeof en;

/** Shape every locale must implement. Missing keys are a compile error. */
export type Dictionary = Record<TranslationKey, Phrase>;
