import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLocale } from "../context/LocaleContext";
import { useTheme } from "../context/ThemeContext";
import GooeyNav from "./GooeyNav";
import type { TranslationKey } from "../i18n";

const links: { to: string; labelKey: TranslationKey; end?: boolean }[] = [
  { to: "/", labelKey: "nav.home", end: true },
  { to: "/shop", labelKey: "nav.shop" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/contact", labelKey: "nav.contact" },
  { to: "/signup", labelKey: "nav.signup" },
];

export default function Navbar() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { t, toggleLocale } = useLocale();
  const { isDark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();
  const urlQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const navigate = useNavigate();

  
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
    setOpen(false);
  };

  return (
    <>
      <div className="announce">
        <div className="container announce__inner">
          <p>
            {t("announce.text")} <Link to="/shop">{t("announce.cta")}</Link>
          </p>
          <div className="announce__actions">
            <button
              type="button"
              className="announce__btn"
              onClick={toggle}
              aria-label={t(isDark ? "theme.toLight" : "theme.toDark")}
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
                  <path
                    d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a8.5 8.5 0 1 0 11.2 11.2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="announce__btn"
              onClick={toggleLocale}
              aria-label={t("lang.switchLabel")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
              {t("lang.switchName")}
            </button>
          </div>
        </div>
      </div>

      <header className="nav">
        <div className="nav__inner container">
          <button
            className="nav__burger"
            aria-label={t("nav.toggleMenu")}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link to="/" className="brand" onClick={() => setOpen(false)}>
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

          {/* Desktop: the gooey pill row. Mobile: the plain list below, which
              doubles as the burger dropdown — the gooey effect measures a
              horizontal row and does not translate to a stacked menu. */}
          <GooeyNav
            items={links.map((l) => ({ to: l.to, label: t(l.labelKey), end: l.end }))}
          />

          <nav className={`nav__links ${open ? "is-open" : ""}`}>
            {links.map((l) => (
              <NavLink
                key={l.labelKey}
                to={l.to}
                end={l.end}
                className={({ isActive }) => (isActive ? "is-active" : "")}
                onClick={() => setOpen(false)}
              >
                {t(l.labelKey)}
              </NavLink>
            ))}
          </nav>

          <div className="nav__tools">
            <form className="nav__search" onSubmit={submitSearch} role="search">
              <input
                type="search"
                placeholder={t("nav.searchPlaceholder")}
                aria-label={t("nav.searchLabel")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" aria-label={t("nav.searchSubmit")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </form>

            <Link
              to="/wishlist"
              className="icon-btn"
              aria-label={t("nav.wishlistLabel", { count: wishCount })}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s-7.5-4.6-10-9.1C.6 9 2 5.5 5.2 5.5c2 0 3.3 1.2 3.8 2 .5-.8 1.8-2 3.8-2C16 5.5 17.4 9 16 11.9 13.5 16.4 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              {wishCount > 0 && <span className="icon-btn__count">{wishCount}</span>}
            </Link>

            <Link
              to="/cart"
              className="icon-btn"
              aria-label={t("nav.cartLabel", { count })}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6h15l-1.5 9.5a2 2 0 0 1-2 1.7H9.5a2 2 0 0 1-2-1.7L6 4H3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1.5" fill="currentColor" />
                <circle cx="17" cy="20" r="1.5" fill="currentColor" />
              </svg>
              {count > 0 && <span className="icon-btn__count">{count}</span>}
            </Link>

            <Link to="/login" className="icon-btn" aria-label={t("nav.accountLabel")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
                <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
