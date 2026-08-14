import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useLocale } from "../context/LocaleContext";
import ProductCard from "../components/ProductCard";
import LottieAnimation from "../components/Lottie";
import emptyBag from "../assets/lottie/empty-bag.json";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Wishlist() {
  const { items, count, clear } = useWishlist();
  const { addItem } = useCart();
  const { t } = useLocale();
  useDocumentTitle(
    count > 0 ? t("wishlist.titleWithCount", { count }) : t("wishlist.title")
  );

  if (count === 0) {
    return (
      <div className="section container state state--tall">
        <LottieAnimation
          animationData={emptyBag}
          ariaLabel={t("wishlist.emptyLabel")}
          style={{ width: 220, height: 220 }}
        />
        <p className="state__title">{t("wishlist.emptyTitle")}</p>
        <p className="muted">{t("wishlist.emptyText")}</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          {t("wishlist.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="section container">
      <div className="shop__head">
        <div>
          <h1>{t("wishlist.title")}</h1>
          <p className="muted">{t("wishlist.saved", { count })}</p>
        </div>
        <div className="wishlist__actions">
          <button
            className="btn btn--primary"
            onClick={() => items.forEach((p) => p.inStock && addItem(p))}
          >
            {t("wishlist.moveAll")}
          </button>
          <button className="btn btn--ghost" onClick={clear}>
            {t("wishlist.clearAll")}
          </button>
        </div>
      </div>
      <div className="product-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
