import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import CategoryShowcase from "../components/CategoryShowcase";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import type { TranslationKey } from "../i18n";

const benefits: { icon: string; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { icon: "🚚", titleKey: "benefit.deliveryTitle", textKey: "benefit.deliveryText" },
  { icon: "🎧", titleKey: "benefit.supportTitle", textKey: "benefit.supportText" },
  { icon: "✅", titleKey: "benefit.guaranteeTitle", textKey: "benefit.guaranteeText" },
  { icon: "🔒", titleKey: "benefit.secureTitle", textKey: "benefit.secureText" },
];

function Eyebrow({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

export default function Home() {
  const { t, isRtl } = useLocale();
  useDocumentTitle(undefined, t("home.metaDescription"));
  const arrow = isRtl ? "←" : "→";

  const featured = products.filter((p) => p.isNew || p.oldPrice).slice(0, 8);
  const explore = products.slice(0, 8);

  return (
    <>
      <Hero />

      <section className="section container">
        <div className="section__head section__head--stack">
          <div>
            <Eyebrow>{t("home.categoriesEyebrow")}</Eyebrow>
            <h2>{t("home.categoriesTitle")}</h2>
          </div>
          <Link to="/shop" className="link-arrow">
            {t("action.viewAll")} {arrow}
          </Link>
        </div>
        <CategoryShowcase />
      </section>

      <section className="section container">
        <div className="section__head section__head--stack">
          <div>
            <Eyebrow>{t("home.featuredEyebrow")}</Eyebrow>
            <h2>{t("home.featuredTitle")}</h2>
          </div>
          <Link to="/shop" className="link-arrow">
            {t("action.viewAll")} {arrow}
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="promo">
        <div className="container promo__inner">
          <div className="promo__text">
            <span className="promo__eyebrow">{t("home.promoEyebrow")}</span>
            <h2>{t("home.promoTitle")}</h2>
            <p>{t("home.promoText")}</p>
            <Link to="/shop?category=Electronics" className="btn btn--buy btn--lg">
              {t("action.buyNow")}
            </Link>
          </div>
          <div className="promo__glow" aria-hidden="true" />
          <div className="promo__product" aria-hidden="true">🎧</div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head section__head--stack">
          <div>
            <Eyebrow>{t("home.exploreEyebrow")}</Eyebrow>
            <h2>{t("home.exploreTitle")}</h2>
          </div>
          <Link to="/shop" className="link-arrow">
            {t("action.viewAll")} {arrow}
          </Link>
        </div>
        <div className="product-grid">
          {explore.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="benefits">
          {benefits.map((b) => (
            <div key={b.titleKey} className="benefit benefit--center">
              <span className="benefit__badge" aria-hidden="true">
                {b.icon}
              </span>
              <div>
                <h3>{t(b.titleKey)}</h3>
                <p>{t(b.textKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
