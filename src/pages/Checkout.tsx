import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLocale, useProductText } from "../context/LocaleContext";
import { formatPrice } from "../lib/format";
import LottieAnimation from "../components/Lottie";
import successCheck from "../assets/lottie/success-check.json";
import emptyBag from "../assets/lottie/empty-bag.json";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import type { CartItem } from "../types";

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 6.99;

const newOrderId = () => "SW-" + Math.floor(100000 + Math.random() * 900000);

/** One order-summary line — localizes its own product name. */
function SummaryLine({ item: { product, quantity } }: { item: CartItem }) {
  const text = useProductText(product);
  return (
    <li>
      <span className="summary__qty">{quantity}×</span>
      <span className="summary__name">{text.name}</span>
      <span>{formatPrice(product.price * quantity)}</span>
    </li>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { t } = useLocale();
  useDocumentTitle(t("checkout.title"));
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generated per order, not once per mount, so a second order in the same
    // session gets its own number.
    setOrderId(newOrderId());
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <div className="section container state state--tall">
        <LottieAnimation
          animationData={successCheck}
          loop={false}
          ariaLabel={t("checkout.successLabel")}
          style={{ width: 180, height: 180 }}
        />
        <p className="state__title">{t("checkout.successTitle")}</p>
        <p className="muted">{t("checkout.successText", { orderId })}</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          {t("checkout.continueShopping")}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section container state state--tall">
        <LottieAnimation
          animationData={emptyBag}
          ariaLabel={t("cart.emptyBagLabel")}
          style={{ width: 200, height: 200 }}
        />
        <p className="state__title">{t("checkout.emptyTitle")}</p>
        <p className="muted">{t("checkout.emptyText")}</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          {t("checkout.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="section container">
      <h1>{t("checkout.title")}</h1>
      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>{t("checkout.contact")}</legend>
            <div className="field">
              <label htmlFor="email">{t("checkout.email")}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t("checkout.placeholderEmail")}
                dir="ltr"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>{t("checkout.shippingAddress")}</legend>
            <div className="grid-2">
              <div className="field">
                <label htmlFor="first">{t("checkout.firstName")}</label>
                <input
                  id="first"
                  name="given-name"
                  autoComplete="given-name"
                  required
                  placeholder={t("checkout.placeholderFirst")}
                />
              </div>
              <div className="field">
                <label htmlFor="last">{t("checkout.lastName")}</label>
                <input
                  id="last"
                  name="family-name"
                  autoComplete="family-name"
                  required
                  placeholder={t("checkout.placeholderLast")}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="address">{t("checkout.address")}</label>
              <input
                id="address"
                name="street-address"
                autoComplete="street-address"
                required
                placeholder={t("checkout.placeholderAddress")}
              />
            </div>
            <div className="grid-2">
              <div className="field">
                <label htmlFor="city">{t("checkout.city")}</label>
                <input
                  id="city"
                  name="address-level2"
                  autoComplete="address-level2"
                  required
                  placeholder={t("checkout.placeholderCity")}
                />
              </div>
              <div className="field">
                <label htmlFor="zip">{t("checkout.postalCode")}</label>
                <input
                  id="zip"
                  name="postal-code"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                  placeholder={t("checkout.placeholderZip")}
                  dir="ltr"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>{t("checkout.payment")}</legend>
            <div className="field">
              <label htmlFor="card">{t("checkout.cardNumber")}</label>
              {/* Card details stay LTR in every locale — digit groups must not
                  reorder under RTL. */}
              <input
                id="card"
                name="cc-number"
                autoComplete="cc-number"
                required
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                dir="ltr"
              />
            </div>
            <div className="grid-2">
              <div className="field">
                <label htmlFor="exp">{t("checkout.expiry")}</label>
                <input
                  id="exp"
                  name="cc-exp"
                  autoComplete="cc-exp"
                  required
                  placeholder={t("checkout.placeholderExpiry")}
                  dir="ltr"
                />
              </div>
              <div className="field">
                <label htmlFor="cvc">{t("checkout.cvc")}</label>
                <input
                  id="cvc"
                  name="cc-csc"
                  autoComplete="cc-csc"
                  required
                  inputMode="numeric"
                  placeholder="123"
                  dir="ltr"
                />
              </div>
            </div>
            <p className="checkout__note">{t("checkout.demoNote")}</p>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            {t("checkout.pay", { total: formatPrice(total) })}
          </button>
        </form>

        <aside className="summary">
          <h2>{t("checkout.yourOrder")}</h2>
          <ul className="summary__list">
            {items.map((item) => (
              <SummaryLine key={item.product.id} item={item} />
            ))}
          </ul>
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
        </aside>
      </div>
    </div>
  );
}
