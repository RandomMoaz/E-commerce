import { Link } from "react-router-dom";
import { categories, products } from "../data/products";
import { useLocale } from "../context/LocaleContext";
import CategoryArt from "./CategoryArt";


export default function CategoryShowcase() {
  const { t, isRtl } = useLocale();

  const countFor = (name: string) =>
    products.filter((p) => p.category === name).length;

  return (
    <div className="cat-grid">
      {categories.map((c, i) => (
        <Link
          key={c.name}
          to={`/shop?category=${c.name}`}
          className={`cat-card ${i === 0 ? "cat-card--feature" : ""}`}
        >
          <CategoryArt category={c} alt={t(`category.${c.name}`)} />
          <span className="cat-card__body">
            <span className="cat-card__name">{t(`category.${c.name}`)}</span>
            <span className="cat-card__blurb">{t(`category.${c.name}.blurb`)}</span>
            <span className="cat-card__meta">
              <span className="cat-card__count">
                {t("shop.itemCount", { count: countFor(c.name) })}
              </span>
              <span className="cat-card__go" aria-hidden="true">
                {isRtl ? "←" : "→"}
              </span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
