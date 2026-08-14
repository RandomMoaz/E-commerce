import { en, type Dictionary, type TranslationKey } from "./en";
import { ar } from "./ar";
import type { Locale, Phrase, Vars } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export type { Dictionary, TranslationKey };
export type { Locale, Phrase, Vars, Plural, PluralForm } from "./types";
export { LOCALES, isLocale } from "./types";
export { productsAr, type ProductText } from "./products.ar";

/** Text direction for a locale. Arabic is the only RTL locale so far. */
export const directionOf = (locale: Locale): "rtl" | "ltr" =>
  locale === "ar" ? "rtl" : "ltr";

/** Display name of each locale, written in that locale. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

const pluralRules = new Map<Locale, Intl.PluralRules>();

function selectPlural(locale: Locale, count: number): Intl.LDMLPluralRule {
  let rules = pluralRules.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRules.set(locale, rules);
  }
  return rules.select(count);
}

/** Fills `{placeholders}`, leaving unknown ones untouched so they're visible. */
function interpolate(text: string, vars?: Vars): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match
  );
}

/**
 * Resolves a key against a locale's dictionary, picking the right plural form
 * from `vars.count` and interpolating placeholders. Falls back to English, then
 * to the key itself, so a missing string never renders as blank.
 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: Vars
): string {
  const entry: Phrase | undefined = dictionaries[locale][key] ?? en[key];

  if (entry === undefined) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] missing translation key: "${key}"`);
    }
    return key;
  }

  if (typeof entry === "string") return interpolate(entry, vars);

  const count = Number(vars?.count ?? 0);
  const form = selectPlural(locale, count);
  return interpolate(entry[form] ?? entry.other, vars);
}
