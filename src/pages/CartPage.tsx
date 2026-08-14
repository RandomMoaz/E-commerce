import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLocale, useProductText } from "../context/LocaleContext";
import { formatPrice } from "../lib/format";
import ProductArt from "../components/ProductArt";
import LottieAnimation from "../components/Lottie";
import emptyBag from "../assets/lottie/empty-bag.json";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import type { CartItem } from "../types";

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 6.99;

/** One cart line — split out so it can localize its own product copy. */
function CartRow({
  item: { product, quantity },
  onSetQuantity,
  onRemove,
}: {
  item: CartItem;
  onSetQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const { t } = useLocale();
  const text = useProductText(product);

  return (
    <div className="cart-row">
      <Link to={`/product/${product.id}`} className="cart-row__art">
        <ProductArt product={product} />
      </Link>
      <div className="cart-row__info">
        <Link to={`/product/${product.id}`} className="cart-row__name">
          {text.name}
        </Link>
        <span className="muted">{text.brand}</span>
        <button className="cart-row__remove" onClick={() => onRemove(product.id)}>
          {t("action.remove")}
        </button>
      </div>
      <div className="qty qty--sm">
        <button
          onClick={() => onSetQuantity(product.id, quantity - 1)}
          aria-label={t("action.decrease")}
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => onSetQuantity(product.id, quantity + 1)}
          aria-label={t("action.increase")}
        >
          +
        </button>
      </div>
      <div className="cart-row__price">{formatPrice(product.price * quantity)}</div>
    </div>
  );
}

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, count } = useCart();
  const { t, isRtl } = useLocale();
  useDocumentTitle(count > 0 ? t("cart.titleWithCount", { count }) : t("cart.title"));

  if (items.length === 0) {
    return (
      <div className="section container state state--tall">
        <LottieAnimation
          animationData={emptyBag}
          ariaLabel={t("cart.emptyBagLabel")}
          style={{ width: 220, height: 220 }}
        />
        <p className="state__title">{t("cart.emptyTitle")}</p>
        <p className="muted">{t("cart.emptyText")}</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const toFree = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="section container">
      <h1>{t("cart.title")}</h1>
      <p className="muted">{t("cart.inYourCart", { count })}</p>

      <div className="cart">
        <div className="cart__items">
          {items.map((item) => (
            <CartRow
              key={item.product.id}
              item={item}
              onSetQuantity={setQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <aside className="summary">
          <h2>{t("cart.summaryTitle")}</h2>
          {toFree > 0 ? (
            <p className="summary__ship-note">
              {t("cart.freeShippingProgress", { amount: formatPrice(toFree) })}
            </p>
          ) : (
            <p className="summary__ship-note summary__ship-note--ok">
              {t("cart.freeShippingUnlocked")}
            </p>
          )}
          <div className="summary__row">
            <span>{t("cart.subtotal")}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary__row">
            <span>{t("cart.shipping")}</span>
            <span>{shipping === 0 ? t("cart.free") : formatPrice(shipping)}</span>
          </div>
          <div className="summary__row summary__row--total">
            <span>{t("cart.total")}</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="btn btn--primary btn--lg btn--block">
            {t("cart.checkout")}
          </Link>
          <Link to="/shop" className="link-arrow summary__continue">
            {isRtl ? "→" : "←"} {t("cart.continueShopping")}
          </Link>
        </aside>
      </div>
    </div>
  );
}
