import Lottie from "lottie-react";
import type { CSSProperties } from "react";

interface LottieAnimationProps {
  /** Parsed Lottie JSON animation data (import from src/assets/lottie). */
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

/**
 * Thin, typed wrapper around lottie-react so pages can drop in any
 * LottieFiles JSON animation with sensible defaults and accessibility.
 *
 * To use your own animation: download a JSON from
 * https://lottiefiles.com/free-animations, save it under
 * src/assets/lottie/, import it, and pass it as `animationData`.
 */
export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className,
  style,
  ariaLabel = "animation",
}: LottieAnimationProps) {
  return (
    <div className={className} style={style} role="img" aria-label={ariaLabel}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
