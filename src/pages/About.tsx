import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import type { TranslationKey } from "../i18n";

const stats: { value: string; labelKey: TranslationKey }[] = [
  { value: "10.5k", labelKey: "about.statSellers" },
  { value: "33k", labelKey: "about.statSales" },
  { value: "45.5k", labelKey: "about.statCustomers" },
  { value: "25k", labelKey: "about.statGross" },
];

const values: { icon: string; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { icon: "🚚", titleKey: "benefit.deliveryTitle", textKey: "benefit.deliveryTextLong" },
  { icon: "🎧", titleKey: "benefit.supportTitle", textKey: "benefit.supportTextLong" },
  { icon: "✅", titleKey: "benefit.guaranteeTitle", textKey: "benefit.guaranteeTextLong" },
];

export default function About() {
  const { t } = useLocale();
  useDocumentTitle(t("about.title"), t("about.metaDescription"));

  return (
    <div className="section container">
      <nav className="crumbs" aria-label={t("crumbs.label")}>
        <Link to="/">{t("crumbs.home")}</Link>
        <span>/</span>
        <span className="crumbs__current">{t("about.title")}</span>
      </nav>

      <section className="about-hero">
        <div className="about-hero__copy">
          <h1>{t("about.heading")}</h1>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>
        <div className="about-hero__art" aria-hidden="true">
          <span className="about-hero__blob" />
          <span className="about-hero__emoji">🛍️</span>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((s) => (
          <div key={s.labelKey} className="stat-card">
            <strong>{s.value}</strong>
            <span>{t(s.labelKey)}</span>
          </div>
        ))}
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="benefits">
          {values.map((v) => (
            <div key={v.titleKey} className="benefit benefit--center">
              <span className="benefit__badge" aria-hidden="true">
                {v.icon}
              </span>
              <div>
                <h3>{t(v.titleKey)}</h3>
                <p>{t(v.textKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
