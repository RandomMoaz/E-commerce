import { Link } from "react-router-dom";
import LottieAnimation from "../components/Lottie";
import emptyBag from "../assets/lottie/empty-bag.json";
import { useLocale } from "../context/LocaleContext";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function NotFound() {
  const { t } = useLocale();
  useDocumentTitle(t("notFound.title"));
  return (
    <div className="section container state state--tall">
      <LottieAnimation
        animationData={emptyBag}
        ariaLabel={t("notFound.title")}
        style={{ width: 200, height: 200 }}
      />
      <p className="state__title">{t("notFound.heading")}</p>
      <p className="muted">{t("notFound.text")}</p>
      <Link to="/" className="btn btn--primary btn--lg">
        {t("action.backHome")}
      </Link>
    </div>
  );
}
