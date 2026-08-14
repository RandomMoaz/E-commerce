import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  directionOf,
  isLocale,
  productsAr,
  translate,
  type Locale,
  type ProductText,
  type TranslationKey,
  type Vars,
} from "../i18n";
import { products } from "../data/products";
import type { Product } from "../types";

const STORAGE_KEY = "shopwave.locale";

/** Reads the saved locale, else falls back to the browser's language. */
function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Storage can throw in private mode — fall through to the browser default.
  }
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** True when the active locale reads right-to-left. */
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Translate a key, interpolating `{vars}` and picking the plural form. */
  t: (key: TranslationKey, vars?: Vars) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const dir = directionOf(locale);

  // Keep the document in sync so CSS logical properties, text selection and
  // screen readers all follow the active language.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const missing = products
      .filter((p) => !(p.id in productsAr))
      .map((p) => p.id);
    if (missing.length) {
      console.warn("[i18n] products missing Arabic copy:", missing.join(", "));
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore quota / private-mode failures; the choice just won't persist.
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir,
      isRtl: dir === "rtl",
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "ar" : "en"),
      t: (key, vars) => translate(locale, key, vars),
    }),
    [locale, dir, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

const EMPTY_TEXT: ProductText = { name: "", brand: "", description: "", tags: [] };

/**
 * Returns a product's text in the active locale, falling back to the English
 * entry when a translation is missing. Call it wherever product copy is
 * rendered — cart and wishlist keep the canonical English product object, so
 * their contents re-translate when the language changes.
 *
 * Accepts null so components that render conditionally (the quick-view modal)
 * can call it before their early return, keeping hook order stable.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useProductText(product: Product | null | undefined): ProductText {
  const { locale } = useLocale();
  return useMemo(() => {
    if (!product) return EMPTY_TEXT;
    if (locale === "ar") {
      const translated = productsAr[product.id as keyof typeof productsAr];
      if (translated) return translated;
    }
    return {
      name: product.name,
      brand: product.brand,
      description: product.description,
      tags: product.tags,
    };
  }, [locale, product]);
}
