import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuickView } from "../context/QuickViewContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLocale, useProductText } from "../context/LocaleContext";
import { formatPrice } from "../lib/format";
import ProductArt from "./ProductArt";
import Stars from "./Stars";

/** Global product quick-view modal, mounted once at the app root. */
export default function QuickViewModal() {
  const { product, close } = useQuickView();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { t, isRtl } = useLocale();
  const [qty, setQty] = useState(1);

  // Reset the quantity when a different product is opened. Done during render
  // (React's "adjusting state when a prop changes" pattern) rather than in an
  // effect, which would cause a second, cascading render.
  const [openedId, setOpenedId] = useState(product?.id);
  if (product?.id !== openedId) {
    setOpenedId(product?.id);
    setQty(1);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (product) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, close]);

  // Hook order must stay stable, so read the product text before bailing out.
  const text = useProductText(product);

  if (!product) return null;
  const wished = has(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={text.name}>
      <div className="modal__backdrop" onClick={close} />
      <div className="modal__panel">
        <button
          className="modal__close"
          onClick={close}
          aria-label={t("action.closeQuickView")}
        >
          ✕
        </button>
        <div className="modal__media">
          <ProductArt product={product} />
        </div>
        <div className="modal__info">
          <span className="card__brand">{text.brand}</span>
          <h2>{text.name}</h2>
          <div className="pdp__meta">
            <Stars rating={product.rating} reviews={product.reviews} />
            <span className={`stock ${product.inStock ? "" : "stock--out"}`}>
              {product.inStock ? t("product.inStock") : t("product.outOfStock")}
            </span>
          </div>
          <div className="price price--lg">
            <span className="price__now">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="price__old">{formatPrice(product.oldPrice)}</span>
                {/* dir="ltr" keeps the leading minus from flipping under RTL. */}
                <span className="badge badge--sale" dir="ltr">
                  {t("product.saleBadge", { discount })}
                </span>
              </>
            )}
          </div>
          <p className="modal__desc">{text.description}</p>
          <div className="pdp__actions">
            <div className="qty" aria-label={t("action.quantityLabel")}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label={t("action.decrease")}
              >
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label={t("action.increase")}>
                +
              </button>
            </div>
            <button
              className="btn btn--primary"
              disabled={!product.inStock}
              onClick={() => {
                addItem(product, qty);
                close();
              }}
            >
              {t("action.addToCartLong")}
            </button>
            <button
              className={`btn btn--icon ${wished ? "is-active" : ""}`}
              aria-label={t("action.toggleWishlist")}
              onClick={() => toggle(product)}
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>
          <Link to={`/product/${product.id}`} className="modal__full" onClick={close}>
            {t("action.viewFullDetails")} {isRtl ? "←" : "→"}
          </Link>
        </div>
      </div>
    </div>
  );
}
