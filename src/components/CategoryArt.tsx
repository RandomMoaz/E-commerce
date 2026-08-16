import { useState } from "react";
import type { CategoryEntry } from "../data/products";


export default function CategoryArt({
  category,
  alt,
  className,
}: {
  category: CategoryEntry;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [c1, c2] = category.colors;

  if (failed) {
    return (
      <div
        className={`cat-art cat-art--fallback ${className ?? ""}`}
        style={{ background: `linear-gradient(140deg, ${c1}, ${c2})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className={`cat-art ${className ?? ""}`}
      src={category.image}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
