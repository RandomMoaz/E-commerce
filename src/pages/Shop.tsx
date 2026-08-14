import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import LottieAnimation from "../components/Lottie";
import { categories, products } from "../data/products";
import type { Category } from "../types";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { productsAr } from "../i18n";
import loader from "../assets/lottie/loader-dots.json";

const SORT_KEYS = ["featured", "price-asc", "price-desc", "rating"] as const;
type SortKey = (typeof SORT_KEYS)[number];

const isSortKey = (v: string | null): v is SortKey =>
  SORT_KEYS.includes(v as SortKey);

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const { t, locale } = useLocale();
  const activeCategory = params.get("category") as Category | null;
  const query = params.get("q")?.toLowerCase() ?? "";
  // Sort lives in the URL so a filtered, sorted view is shareable and survives
  // a back/forward navigation.
  const sortParam = params.get("sort");
  const sort: SortKey = isSortKey(sortParam) ? sortParam : "featured";

  // `loading` is derived: the loader shows until the timer marks the current
  // filter combination as settled, so no setState runs in the effect body.
  const filterKey = `${activeCategory ?? ""}|${query}`;
  const [settledKey, setSettledKey] = useState<string | null>(null);
  const loading = settledKey !== filterKey;

  useDocumentTitle(
    query
      ? t("shop.searchTitle", { query })
      : activeCategory
        ? t(`category.${activeCategory}`)
        : t("shop.allProducts")
  );

  // Simulate a short data fetch so the Lottie loader is visible.
  useEffect(() => {
    const timer = setTimeout(() => setSettledKey(filterKey), 550);
    return () => clearTimeout(timer);
  }, [filterKey]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (query)
      list = list.filter((p) => {
        // Search the active locale's copy as well as the English original, so
        // Arabic terms match Arabic names and English ones keep working.
        const ar = locale === "ar" ? productsAr[p.id as keyof typeof productsAr] : undefined;
        const haystack = [
          p.name,
          p.brand,
          ...p.tags,
          ...(ar ? [ar.name, ar.brand, ...ar.tags] : []),
        ];
        return haystack.some((s) => s.toLowerCase().includes(query));
      });
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [activeCategory, query, sort, locale]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const setCategory = (cat: Category | null) => updateParam("category", cat);

  return (
    <div className="section container">
      <header className="shop__head">
        <div>
          <h1>{activeCategory ? t(`category.${activeCategory}`) : t("shop.allProducts")}</h1>
          <p className="muted">
            {query ? `${t("shop.resultsFor", { query })} · ` : ""}
            {t("shop.itemCount", { count: filtered.length })}
          </p>
        </div>
        <label className="select">
          <span>{t("shop.sort")}</span>
          <select
            value={sort}
            onChange={(e) =>
              updateParam("sort", e.target.value === "featured" ? null : e.target.value)
            }
          >
            <option value="featured">{t("shop.sortFeatured")}</option>
            <option value="price-asc">{t("shop.sortPriceAsc")}</option>
            <option value="price-desc">{t("shop.sortPriceDesc")}</option>
            <option value="rating">{t("shop.sortRating")}</option>
          </select>
        </label>
      </header>

      <div className="chips">
        <button
          className={`chip ${!activeCategory ? "is-active" : ""}`}
          onClick={() => setCategory(null)}
        >
          {t("shop.all")}
        </button>
        {categories.map((c) => (
          <button
            key={c.name}
            className={`chip ${activeCategory === c.name ? "is-active" : ""}`}
            onClick={() => setCategory(c.name)}
          >
            {t(`category.${c.name}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="state">
          <LottieAnimation
            animationData={loader}
            ariaLabel={t("shop.loadingLabel")}
            style={{ width: 160, height: 90 }}
          />
          <p className="muted">{t("shop.loading")}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="state">
          <p className="state__title">{t("shop.emptyTitle")}</p>
          <p className="muted">{t("shop.emptyText")}</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
