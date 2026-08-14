# 🌊 ShopWave — React + TypeScript E-Commerce Store

A modern, fully **responsive** e-commerce storefront built with **React**,
**TypeScript**, and **Vite**, with **Lottie** animations. The UI is styled to
match the Almdrasa / "Exclusive" Figma design — light body, **red `#DB4444`**
primary, bright **green `#00FF66`** call-to-action, dark header bar and footer,
and product cards with wishlist + quick-view.

![React](https://img.shields.io/badge/React-18-61dafb) ![TS](https://img.shields.io/badge/TypeScript-5-3178c6) ![Vite](https://img.shields.io/badge/Vite-5-646cff)

## ✨ Features

- **English & Arabic with full RTL** — a one-click language switch that flips the
  whole layout, swaps to an Arabic typeface, and translates the product
  catalogue too. See [Languages & RTL](#-languages--rtl-english--العربية).
- **Design-matched theme** — palette, dark announcement bar, red/green accents,
  product-card style and section rhythm taken from the Figma.
- **Real product photos** — each product uses an Unsplash photo, with an
  automatic gradient fallback if an image ever fails to load, so the UI never
  breaks.
- **Complete store flow** — Home, Shop (category filter + search + sort), Product
  detail, Cart, and Checkout (with animated order confirmation).
- **Wishlist** — heart any product; dedicated Wishlist page, header count badge,
  and "move all to cart".
- **Quick view** — the eye icon opens a modal with the product summary,
  quantity, add-to-cart and wishlist — without leaving the page.
- **More pages** — About ("Our Story" + stats), Contact (info + form), Log In and
  Sign Up (split-screen), and a 404 page — matching the Figma page set.
- **Cart state** — global cart (Context + `useReducer`) with subtotal and a
  free-shipping threshold. Wishlist and quick-view have their own contexts.
- **Lottie animations** — hero, loading, empty-state and order-success, via
  `lottie-react`.
- **Fully responsive** — mobile-first CSS, collapsible nav, fluid typography.
- **Type-safe** — strict TypeScript throughout.

## 🚀 Getting started

```bash
npm install
npm run dev         # dev server at http://localhost:5173
npm run build       # type-check + production build
npm run preview     # preview the production build
npm run lint        # ESLint (flat config, TS + react-hooks rules)
npm run type-check  # tsc --noEmit
```

Requires Node 18+.

## 🖼 About the product photos

Photos are loaded from Unsplash URLs defined in `src/data/products.ts`. They load
on your machine's normal internet connection. If any URL fails, the card falls
back to a gradient placeholder automatically (see `src/components/ProductArt.tsx`).

To use your **own** images, either:

- set each product's `image` to your own URL in `src/data/products.ts`, or
- drop files into `public/images/` and reference them as `/images/name.jpg`.

## 🗂 Project structure

```
src/
├─ main.tsx                 # entry: Router + Locale/Cart/Wishlist/QuickView providers
├─ App.tsx                  # routes, wrapped in an ErrorBoundary
├─ index.css                # all global + responsive styles (theme tokens on :root)
├─ types.ts                 # Product / CartItem types
├─ data/products.ts         # catalog + photo URLs (swap for your API)
├─ i18n/
│  ├─ en.ts                 # English dictionary — the source of truth for keys
│  ├─ ar.ts                 # Arabic dictionary (typed against en.ts)
│  ├─ products.ar.ts        # Arabic product copy, keyed by product id
│  ├─ types.ts              # Locale / Plural / Vars types
│  └─ index.ts              # translate(), direction, plural selection
├─ context/
│  ├─ LocaleContext.tsx     # active language + t() + useProductText()
│  ├─ CartContext.tsx
│  ├─ WishlistContext.tsx
│  └─ QuickViewContext.tsx
├─ lib/
│  ├─ format.ts             # price formatting
│  └─ useDocumentTitle.ts   # per-page <title> + meta description
├─ components/              # Navbar, Footer, Hero, ProductCard, QuickViewModal,
│                           # ErrorBoundary, …
├─ pages/                   # Home, Shop, ProductDetail, Cart, Checkout,
│                           # Wishlist, About, Contact, Login, SignUp, NotFound
└─ assets/lottie/*.json     # Lottie animations
```

## 🌍 Languages & RTL (English / العربية)

The store ships in **English and Arabic**, with full right-to-left support.
Switch with the globe button in the announcement bar — the choice is saved to
`localStorage`, and first-time visitors whose browser language is Arabic get
Arabic automatically.

Switching sets `lang` and `dir` on `<html>`, which drives everything else:

- **Layout** flips via CSS **logical properties** (`margin-inline-start`,
  `inset-inline-end`, `text-align: start`), so there is no separate RTL
  stylesheet to maintain.
- **Typography** swaps to **Cairo** — the `--font` / `--font-display` tokens are
  redefined under `[dir="rtl"]`, because Inter and Plus Jakarta Sans have no
  Arabic glyphs.
- **Products translate too.** Names, brands, descriptions and tags all have
  Arabic copy, and Shop search matches either language.
- **Prices stay Western digits** (`$129.00`) in both locales — the convention on
  most Arabic storefronts. Card, email and phone fields are pinned `dir="ltr"`
  so digit groups never reorder.

### Adding a string

```tsx
// 1. add the key to src/i18n/en.ts  →  "cart.giftNote": "Add a gift note"
// 2. add the same key to src/i18n/ar.ts (TypeScript fails the build if you don't)
// 3. use it
const { t } = useLocale();
<label>{t("cart.giftNote")}</label>;
```

Counted phrases take a `count` variable and pick the right CLDR plural form —
English has two, Arabic has all six (zero/one/two/few/many/other):

```tsx
t("shop.itemCount", { count: 3 }); // "3 items"  /  "3 منتجات"
t("shop.itemCount", { count: 11 }); // "11 items" /  "11 منتجًا"
```

### Adding a language

1. Copy `src/i18n/ar.ts` to `src/i18n/<code>.ts` and translate the values.
2. Add the code to `LOCALES` in `src/i18n/types.ts` and to `dictionaries` in
   `src/i18n/index.ts`.
3. If it is RTL, add it to `directionOf()`.

Product copy lives in `src/i18n/products.ar.ts`, keyed by product id. Anything
missing falls back to English rather than rendering blank, and dev builds log a
warning listing untranslated products.

## 🎨 Theming

All colors live as CSS custom properties at the top of `src/index.css`
(`--red`, `--green`, `--ink`, `--text`, …). Change them once to re-skin the
whole app. Regenerate the Lottie animations with
`node scripts/generate_lottie.mjs`.

## 🎬 Swapping in animations from LottieFiles

Download any animation as **Lottie JSON** from
[lottiefiles.com/free-animations](https://lottiefiles.com/free-animations), save
it under `src/assets/lottie/`, then:

```tsx
import LottieAnimation from "../components/Lottie";
import myAnim from "../assets/lottie/my-animation.json";

<LottieAnimation animationData={myAnim} ariaLabel="my animation" />;
```

## 🧪 Verification

```bash
npm run lint         # ESLint — no errors
npm run build        # tsc --noEmit (strict) + vite build
npm run smoke        # headless Chromium walk of every route
```

The smoke test (`scripts/smoke.mjs`) serves `dist/` with an SPA fallback and
walks every page — Home (desktop + mobile), Shop, a sorted/filtered Shop, a
product, Cart, Checkout, Wishlist, About, Contact, Log In, Sign Up, 404 and the
quick-view modal — failing the run on any app-level console or page error.
Screenshots are written to `screenshots/` (gitignored).

It needs Playwright, which is not a project dependency:

```bash
npm install -D playwright && npx playwright install chromium
```

---

Built with React, TypeScript, Vite & Lottie.
