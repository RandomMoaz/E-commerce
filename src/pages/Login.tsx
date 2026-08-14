import { useState } from "react";
import { Link } from "react-router-dom";
import LottieAnimation from "../components/Lottie";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import heroFloat from "../assets/lottie/hero-float.json";

export default function Login() {
  const { t } = useLocale();
  useDocumentTitle(t("auth.loginPageTitle"));
  const [done, setDone] = useState(false);

  return (
    <div className="auth">
      <div className="auth__aside" aria-hidden="true">
        <LottieAnimation animationData={heroFloat} className="auth__lottie" ariaLabel="" />
      </div>
      <div className="auth__form-wrap">
        <form
          className="auth__form"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <h1>{t("auth.loginTitle")}</h1>
          <p className="muted">{t("auth.subtitle")}</p>

          <div className="field">
            <input
              required
              type="text"
              name="username"
              autoComplete="username"
              placeholder={t("auth.emailOrPhone")}
              aria-label={t("auth.emailOrPhone")}
            />
          </div>
          <div className="field">
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder={t("auth.password")}
              aria-label={t("auth.password")}
            />
          </div>

          {done && <p className="auth__note-ok">{t("auth.loginDemoNote")}</p>}

          <div className="auth__row">
            <button type="submit" className="btn btn--primary btn--lg">
              {t("auth.logIn")}
            </button>
            <a href="#" className="auth__forgot">
              {t("auth.forgot")}
            </a>
          </div>

          <p className="auth__switch">
            {t("auth.noAccount")} <Link to="/signup">{t("auth.signUpLink")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
