import { useState } from "react";
import { Link } from "react-router-dom";
import LottieAnimation from "../components/Lottie";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import heroFloat from "../assets/lottie/hero-float.json";

export default function SignUp() {
  const { t } = useLocale();
  useDocumentTitle(t("auth.signupTitle"));
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
          <h1>{t("auth.signupTitle")}</h1>
          <p className="muted">{t("auth.subtitle")}</p>

          <div className="field">
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t("auth.name")}
              aria-label={t("auth.name")}
            />
          </div>
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
              autoComplete="new-password"
              placeholder={t("auth.password")}
              aria-label={t("auth.password")}
            />
          </div>

          {done && <p className="auth__note-ok">{t("auth.signupDemoNote")}</p>}

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            {t("auth.createAccount")}
          </button>
          <button type="button" className="btn btn--ghost btn--lg btn--block auth__google">
            <span aria-hidden="true">G</span> {t("auth.googleSignup")}
          </button>

          <p className="auth__switch">
            {t("auth.haveAccount")} <Link to="/login">{t("auth.logInLink")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
