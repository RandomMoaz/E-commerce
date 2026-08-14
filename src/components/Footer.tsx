import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="brand__name">ShopWave</span>
          <p>{t("footer.blurb")}</p>
          <div className="footer__social" aria-label={t("footer.socialLabel")}>
            {["twitter", "instagram", "youtube"].map((s) => (
              <a key={s} href="#" aria-label={s} className="footer__social-btn">
                <span aria-hidden="true">{s[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>{t("footer.shop")}</h4>
          <Link to="/shop">{t("footer.allProducts")}</Link>
          <Link to="/shop?category=Electronics">{t("category.Electronics")}</Link>
          <Link to="/shop?category=Fashion">{t("category.Fashion")}</Link>
          <Link to="/shop?category=Home">{t("category.Home")}</Link>
        </div>

        <div className="footer__col">
          <h4>{t("footer.company")}</h4>
          <Link to="/about">{t("footer.aboutUs")}</Link>
          <a href="#">{t("footer.careers")}</a>
          <a href="#">{t("footer.sustainability")}</a>
          <a href="#">{t("footer.press")}</a>
        </div>

        <div className="footer__col">
          <h4>{t("footer.support")}</h4>
          <a href="#">{t("footer.helpCenter")}</a>
          <a href="#">{t("footer.shipping")}</a>
          <a href="#">{t("footer.returns")}</a>
          <Link to="/contact">{t("nav.contact")}</Link>
        </div>

        <div className="footer__newsletter">
          <h4>{t("footer.newsletterTitle")}</h4>
          <p>{t("footer.newsletterText")}</p>
          <form
            className="footer__form"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget.reset as () => void)();
            }}
          >
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={t("footer.emailPlaceholder")}
              aria-label={t("footer.emailPlaceholder")}
              dir="ltr"
            />
            <button type="submit" className="btn btn--primary">
              {t("footer.subscribe")}
            </button>
          </form>
        </div>
      </div>
      <div className="footer__bar container">
        <span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
        <span>{t("footer.builtWith")}</span>
      </div>
    </footer>
  );
}
