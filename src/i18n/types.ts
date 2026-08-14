/** CLDR plural categories. Arabic uses all six; English uses one/other. */
export type PluralForm = Intl.LDMLPluralRule;

/** A phrase that varies by count. `other` is the required fallback. */
export type Plural = Partial<Record<PluralForm, string>> & { other: string };

export type Phrase = string | Plural;

/** Values interpolated into `{placeholders}`. */
export type Vars = Record<string, string | number>;

export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];

export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && (LOCALES as string[]).includes(v);
