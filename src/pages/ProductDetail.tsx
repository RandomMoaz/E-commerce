import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, relatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLocale, useProductText } from "../context/LocaleContext";
import { formatPrice } from "../lib/format";
import ProductArt from "../components/ProductArt";
import ProductCard from "../components/ProductCard";
import Stars from "../components/Stars";
import NotFound from "./NotFound";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { t } = useLocale();
  const text = useProductText(product);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Set here rather than in the NotFound fallback: child effects run first, so
  // the parent would otherwise overwrite the 404 title.
  useDocumentTitle(product ? text.name : t("notFound.title"), text.description);

  if (!product) return <NotFound />;

  const related = relatedProducts(product);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="section container">
      <nav className="crumbs" aria-label={t("crumbs.label")}>
        <Link to="/">{t("crumbs.home")}</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>
          {t(`category.${product.category}`)}
        </Link>
        <span>/</span>
        <span className="crumbs__current">{text.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp__media">
          <ProductArt product={product} className="pdp__art" />
          <div className="pdp__thumbs">
            {[0, 1, 2].map((i) => (
              <div key={i} className="pdp__thumb">
                <ProductArt product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <span className="card__brand">{text.brand}</span>
          <h1>{text.name}</h1>
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
                <span className="badge badge--sale">{t("product.save", { discount })}</span>
              </>
            )}
          </div>

          <p className="pdp__desc">{text.description}</p>

          <ul className="pdp__tags">
            {text.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

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
              className="btn btn--primary btn--lg"
              disabled={!product.inStock}
              onClick={handleAdd}
            >
              {added
                ? t("action.added")
                : product.inStock
                  ? t("action.addToCartLong")
                  : t("action.soldOut")}
            </button>
            <button
              className={`btn btn--icon btn--icon-lg ${has(product.id) ? "is-active" : ""}`}
              aria-label={t("action.toggleWishlist")}
              aria-pressed={has(product.id)}
              onClick={() => toggle(product)}
            >
              {has(product.id) ? "♥" : "♡"}
            </button>
          </div>

          <div className="pdp__perks">
            <span>{t("product.perkShipping")}</span>
            <span>{t("product.perkReturns")}</span>
            <span>{t("product.perkSecure")}</span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section__head">
            <h2>{t("product.related")}</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
