import { useEffect } from "react";
import { useLocale } from "../context/LocaleContext";

/** The brand name is not translated — it reads the same in every locale. */
const SUFFIX = "ShopWave";

/**
 * Sets `document.title` (and the meta description, when given) for the current
 * page, restoring nothing on unmount — the next route sets its own.
 *
 * @example useDocumentTitle("Shopping cart")  // → "Shopping cart · ShopWave"
 */
export function useDocumentTitle(title?: string, description?: string) {
  const { t } = useLocale();
  const fallback = t("meta.defaultTitle");

  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : fallback;
  }, [title, fallback]);

  useEffect(() => {
    if (!description) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
  }, [description]);
}
