import { Link } from "react-router-dom";
import type { Product } from "../types";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useQuickView } from "../context/QuickViewContext";
import { useLocale, useProductText } from "../context/LocaleContext";
import Stars from "./Stars";
import ProductArt from "./ProductArt";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { open } = useQuickView();
  const { t } = useLocale();
  const text = useProductText(product);
  const wished = has(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article className="card">
      <div className="card__media">
        <div className="card__badges">
          {product.isNew && <span className="badge badge--new">{t("product.new")}</span>}
          {discount > 0 && (
            // dir="ltr": the leading minus is a neutral character, so under RTL
            // bidi it would jump to the far side and render as "28%-".
            <span className="badge badge--sale" dir="ltr">
              {t("product.saleBadge", { discount })}
            </span>
          )}
          {!product.inStock && (
            <span className="badge badge--out">{t("action.soldOut")}</span>
          )}
        </div>
        <div className="card__actions">
          <button
            className={`round-btn ${wished ? "is-active" : ""}`}
            aria-label={
              wished ? t("action.removeFromWishlist") : t("action.addToWishlist")
            }
            aria-pressed={wished}
            onClick={() => toggle(product)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 21s-7.5-4.6-10-9.1C.6 9 2 5.5 5.2 5.5c2 0 3.3 1.2 3.8 2 .5-.8 1.8-2 3.8-2C16 5.5 17.4 9 16 11.9 13.5 16.4 12 21 12 21Z"
                fill={wished ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="round-btn"
            aria-label={t("action.quickView")}
            onClick={() => open(product)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </button>
        </div>
        <Link to={`/product/${product.id}`} className="card__imgwrap">
          <ProductArt product={product} />
        </Link>
        <button
          className="card__add"
          disabled={!product.inStock}
          onClick={() => addItem(product)}
        >
          {product.inStock ? t("action.addToCart") : t("action.soldOut")}
        </button>
      </div>
      <div className="card__body">
        <h3 className="card__title">
          <Link to={`/product/${product.id}`}>{text.name}</Link>
        </h3>
        <div className="price">
          <span className="price__now">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="price__old">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        <Stars rating={product.rating} reviews={product.reviews} />
      </div>
    </article>
  );
}
