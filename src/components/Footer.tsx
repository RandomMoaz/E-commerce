import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";

const SOCIALS: { name: string; href: string; path: string }[] = [
  {
    name: "X",
    href: "#",
    path: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.4-8.5L1 3h6.6l4.5 5.6L17.5 3Zm-1.1 16.1h1.8L7.7 4.8H5.8l10.6 14.3Z",
  },
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.3-8.2a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0Z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M22.5 7.2a2.8 2.8 0 0 0-1.9-2C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.8 2.8 0 0 0 1.9 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M6.2 21H2.6V9.3h3.6V21ZM4.4 7.7a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM21.4 21h-3.6v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H10V9.3h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21Z",
  },
];

const PAYMENTS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

export default function Footer() {
  const { t } = useLocale();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="brand__mark" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="9" fill="#DB4444" />
                <path
                  d="M9 11h14l-1.4 9.2a2 2 0 0 1-2 1.8h-7.2a2 2 0 0 1-2-1.8L9 11Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 11a3.5 3.5 0 0 1 7 0"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="brand__name">ShopWave</span>
          </Link>

          <p className="footer__blurb">{t("footer.blurb")}</p>

          <ul className="footer__contact">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
              <a href="mailto:support@shopwave.com" dir="ltr">
                support@shopwave.com
              </a>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4h1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              <a href="tel:+201001234567" dir="ltr">
                +20 100 123 4567
              </a>
            </li>
          </ul>

          <div className="footer__social" aria-label={t("footer.socialLabel")}>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="footer__social-btn"
                aria-label={t("footer.followOn", { network: s.name })}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav className="footer__col" aria-label={t("footer.shop")}>
          <h4>{t("footer.shop")}</h4>
          <Link to="/shop">{t("footer.allProducts")}</Link>
          <Link to="/shop?category=Electronics">{t("category.Electronics")}</Link>
          <Link to="/shop?category=Fashion">{t("category.Fashion")}</Link>
          <Link to="/shop?category=Home">{t("category.Home")}</Link>
          <Link to="/shop?category=Beauty">{t("category.Beauty")}</Link>
        </nav>

        <nav className="footer__col" aria-label={t("footer.company")}>
          <h4>{t("footer.company")}</h4>
          <Link to="/about">{t("footer.aboutUs")}</Link>
          <a href="#">{t("footer.careers")}</a>
          <a href="#">{t("footer.sustainability")}</a>
          <a href="#">{t("footer.press")}</a>
        </nav>

        <nav className="footer__col" aria-label={t("footer.support")}>
          <h4>{t("footer.support")}</h4>
          <a href="#">{t("footer.helpCenter")}</a>
          <a href="#">{t("footer.shipping")}</a>
          <a href="#">{t("footer.returns")}</a>
          <Link to="/contact">{t("nav.contact")}</Link>
        </nav>

        <div className="footer__newsletter">
          <h4>{t("footer.newsletterTitle")}</h4>
          <p>{t("footer.newsletterText")}</p>
          <form
            className="footer__form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
              e.currentTarget.reset();
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
          {/* aria-live so the confirmation is announced, not just shown. */}
          <p className="footer__form-ok" role="status" aria-live="polite">
            {subscribed ? t("footer.newsletterOk") : ""}
          </p>

          <div className="footer__pay">
            <span className="footer__pay-label">{t("footer.paymentsLabel")}</span>
            <ul>
              {PAYMENTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
          <nav className="footer__legal" aria-label={t("footer.legalLabel")}>
            <a href="#">{t("footer.privacy")}</a>
            <a href="#">{t("footer.terms")}</a>
            <a href="#">{t("footer.cookies")}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
