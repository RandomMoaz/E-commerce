import { useCallback, useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import "./GooeyNav.css";

export interface GooeyNavItem {
  /** Router path, e.g. "/shop". */
  to: string;
  label: string;
  /** Match the path exactly instead of by prefix (used for "/"). */
  end?: boolean;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
}

const noise = (n = 1) => n / 2 - Math.random() * n;

function getXY(distance: number, pointIndex: number, totalPoints: number): [number, number] {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
}


export default function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { pathname } = useLocation();

  const matched = items.findIndex((item) =>
    item.end ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/")
  );
  const activeIndex = matched === -1 ? -1 : matched;

  const createParticle = useCallback(
    (i: number, t: number, d: [number, number], r: number) => {
      const rotate = noise(r / 10);
      return {
        start: getXY(d[0], particleCount - i, particleCount),
        end: getXY(d[1] + noise(7), particleCount - i, particleCount),
        time: t,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
      };
    },
    [colors, particleCount]
  );

  const makeParticles = useCallback(
    (element: HTMLElement) => {
      const d = particleDistances;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty("--time", `${bubbleTime}ms`);

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const p = createParticle(i, t, d, particleR);
        element.classList.remove("active");

        setTimeout(() => {
          const particle = document.createElement("span");
          const point = document.createElement("span");
          particle.classList.add("particle");
          particle.style.setProperty("--start-x", `${p.start[0]}px`);
          particle.style.setProperty("--start-y", `${p.start[1]}px`);
          particle.style.setProperty("--end-x", `${p.end[0]}px`);
          particle.style.setProperty("--end-y", `${p.end[1]}px`);
          particle.style.setProperty("--time", `${p.time}ms`);
          particle.style.setProperty("--scale", `${p.scale}`);
          particle.style.setProperty("--color", `var(--goo-particle-${p.color}, var(--goo-blob))`);
          particle.style.setProperty("--rotate", `${p.rotate}deg`);

          point.classList.add("point");
          particle.appendChild(point);
          element.appendChild(particle);
          requestAnimationFrame(() => element.classList.add("active"));

          setTimeout(() => {
            try {
              element.removeChild(particle);
            } catch {
              // Already detached — nothing to clean up.
            }
          }, t);
        }, 30);
      }
    },
    [animationTime, createParticle, particleCount, particleDistances, particleR, timeVariance]
  );

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const burst = (index: number) => {
    if (index === activeIndex) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const li = navRef.current?.querySelectorAll("li")[index] as HTMLElement | undefined;
    if (li) updateEffectPosition(li);

    if (filterRef.current) {
      filterRef.current.querySelectorAll(".particle").forEach((p) => p.remove());
    }
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth; // restart the CSS animation
      textRef.current.classList.add("active");
    }
    if (filterRef.current) makeParticles(filterRef.current);
  };

  const handleClick = (_e: MouseEvent<HTMLAnchorElement>, index: number) => burst(index);

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
   
    if (e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  useEffect(() => {
    const nav = navRef.current;
    const container = containerRef.current;
    if (!nav || !container) return;

    const place = () => {
      const li = nav.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
      if (li) {
        updateEffectPosition(li);
        textRef.current?.classList.add("active");
      } else {
        // No item matches this route — hide the pill rather than stranding it.
        if (filterRef.current) filterRef.current.style.width = "0px";
        if (textRef.current) {
          textRef.current.style.width = "0px";
          textRef.current.classList.remove("active");
        }
      }
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(container);
    ro.observe(nav);

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(place).catch(() => {});

    return () => ro.disconnect();
  }, [activeIndex, updateEffectPosition]);

  return (
    <div className="gooey-nav" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.to} className={activeIndex === index ? "active" : ""}>
              <Link
                to={item.to}
                onClick={(e) => handleClick(e, index)}
                onKeyDown={handleKeyDown}
                aria-current={activeIndex === index ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} aria-hidden="true" />
      <span className="effect text" ref={textRef} aria-hidden="true" />
    </div>
  );
}
