import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Contact() {
  const { t } = useLocale();
  useDocumentTitle(t("contact.title"), t("contact.metaDescription"));
  const [sent, setSent] = useState(false);

  return (
    <div className="section container">
      <nav className="crumbs" aria-label={t("crumbs.label")}>
        <Link to="/">{t("crumbs.home")}</Link>
        <span>/</span>
        <span className="crumbs__current">{t("contact.title")}</span>
      </nav>

      <div className="contact">
        <aside className="contact__info">
          <div className="contact__block">
            <span className="contact__icon" aria-hidden="true">📞</span>
            <div>
              <h3>{t("contact.callTitle")}</h3>
              <p>{t("contact.callText")}</p>
              <p>{t("contact.phone")}</p>
            </div>
          </div>
          <hr />
          <div className="contact__block">
            <span className="contact__icon" aria-hidden="true">✉️</span>
            <div>
              <h3>{t("contact.writeTitle")}</h3>
              <p>{t("contact.writeText")}</p>
              <p dir="ltr">support@shopwave.com</p>
            </div>
          </div>
        </aside>

        <form
          className="contact__form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            (e.currentTarget.reset as () => void)();
          }}
        >
          <div className="grid-3">
            <input
              required
              name="name"
              autoComplete="name"
              placeholder={t("contact.placeholderName")}
              aria-label={t("contact.labelName")}
            />
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("contact.placeholderEmail")}
              aria-label={t("contact.labelEmail")}
              dir="ltr"
            />
            <input
              required
              name="tel"
              type="tel"
              autoComplete="tel"
              placeholder={t("contact.placeholderPhone")}
              aria-label={t("contact.labelPhone")}
              dir="ltr"
            />
          </div>
          <textarea
            required
            name="message"
            rows={7}
            placeholder={t("contact.placeholderMessage")}
            aria-label={t("contact.labelMessage")}
          />
          <div className="contact__submit">
            {sent && <span className="contact__ok">{t("contact.sent")}</span>}
            <button type="submit" className="btn btn--primary btn--lg">
              {t("contact.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
