import { Link } from "react-router-dom";
import LottieAnimation from "./Lottie";
import { useLocale } from "../context/LocaleContext";
import heroFloat from "../assets/lottie/hero-float.json";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="hero__title">
            {t("hero.titleLead")}{" "}
            <span className="accent-text">{t("hero.titleAccent")}</span>.
          </h1>
          <p className="hero__sub">{t("hero.sub")}</p>
          <div className="hero__cta">
            <Link to="/shop" className="btn btn--primary btn--lg">
              {t("action.shopNow")}
            </Link>
            <Link to="/shop?category=Electronics" className="btn btn--buy btn--lg">
              {t("action.buyNow")}
            </Link>
          </div>
          <ul className="hero__stats">
            <li>
              <strong>1M+</strong>
              <span>{t("hero.statProducts")}</span>
            </li>
            <li>
              <strong>4.8/5</strong>
              <span>{t("hero.statRating")}</span>
            </li>
            <li>
              <strong>{t("hero.statDeliveryValue")}</strong>
              <span>{t("hero.statDelivery")}</span>
            </li>
          </ul>
        </div>
        <div className="hero__art">
          <LottieAnimation
            animationData={heroFloat}
            ariaLabel={t("hero.artLabel")}
            className="hero__lottie"
          />
        </div>
      </div>
    </section>
  );
}
