import { useLocale } from "../context/LocaleContext";

interface StarsProps {
  rating: number;
  reviews?: number;
  size?: number;
}

/** Accessible 5-star rating with fractional fill. */
export default function Stars({ rating, reviews, size = 16 }: StarsProps) {
  const { t } = useLocale();
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const label = rating.toFixed(1);
  return (
    <span
      className="stars"
      aria-label={t("product.ratingLabel", { rating: label })}
      title={`${label} / 5`}
    >
      {/* Stars always render left-to-right: the fill overlay is positioned from
          the inline start, and a flipped strip reads as a different score. */}
      <span className="stars__track" style={{ fontSize: size }} dir="ltr">
        <span className="stars__base">★★★★★</span>
        <span className="stars__fill" style={{ width: `${pct}%` }}>
          ★★★★★
        </span>
      </span>
      {reviews !== undefined && (
        <span className="stars__count">({reviews.toLocaleString("en-US")})</span>
      )}
    </span>
  );
}
