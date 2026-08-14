import { useState } from "react";
import type { Product } from "../types";
import { useProductText } from "../context/LocaleContext";

interface ProductArtProps {
  product: Product;
  className?: string;
}

/**
 * Renders the real product photo. If the image fails to load (e.g. offline),
 * it gracefully falls back to a gradient placeholder built from the product's
 * accent colors and initials — so the UI never shows a broken image.
 */
export default function ProductArt({ product, className }: ProductArtProps) {
  const [failed, setFailed] = useState(false);
  const text = useProductText(product);
  const [c1, c2] = product.colors;

  if (failed) {
    // Initials come from the English name: Arabic has no capital forms, so
    // stacked initials read as noise.
    const initials = product.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <div
        className={`product-art ${className ?? ""}`}
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        aria-hidden="true"
      >
        <span className="product-art__blob product-art__blob--1" />
        <span className="product-art__blob product-art__blob--2" />
        <span className="product-art__label">{initials}</span>
      </div>
    );
  }

  return (
    <img
      className={`product-img ${className ?? ""}`}
      src={product.image}
      alt={text.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
