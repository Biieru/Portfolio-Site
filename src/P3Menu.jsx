import { useState, useEffect, useCallback, useRef } from "react";
import { playMenuConfirmTick, playMenuNavTick } from "./menuSfx";
import "./styles/p3menu.css";

const ITEMS = [
  { id: "about", label: "ABOUT ME", page: "about", fontSize: 80, offsetX: 0, offsetY: 0, skew: -6, skewY: 10 },
  { id: "resume", label: "RESUME", page: "resume", fontSize: 66, offsetX: 20, offsetY: 8, skew: -11, skewY: -10 },
  { id: "github", label: "GITHUB LINK", page: "github", fontSize: 68, offsetX: 8, offsetY: 6, skew: 0, skewY: -4 },
  { id: "socials", label: "SOCIALS", page: "socials", fontSize: 74, offsetX: 16, offsetY: 8, skew: -3, skewY: 5 },
  { id: "projects", label: "SIDE PROJECTS", page: "projects", fontSize: 56, offsetX: 10, offsetY: 6, skew: -4, skewY: 7 },
];

const clipShape = (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

// Estimativa usada só até a fonte carregar e os labels serem medidos de verdade.
const estimateDims = (item) => ({
  w: item.label.length * item.fontSize * 0.6 + 80,
  h: item.fontSize * 0.94,
});

export default function P3Menu({ onNavigate, onActiveChange, initialActive = 0 }) {
  const [active, setActive] = useState(initialActive);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [isTouchLike, setIsTouchLike] = useState(false);
  const [dims, setDims] = useState(() => ITEMS.map(estimateDims));
  const labelRefs = useRef([]);

  const activate = useCallback((idx) => {
    setActive((prev) => {
      if (prev !== idx) playMenuNavTick();
      return idx;
    });
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Mede a largura real de cada label (offsetWidth ignora o skew do wrapper),
  // para o highlight/triângulo acompanharem o texto mesmo se a fonte variar.
  useEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive) return;
      setDims(
        ITEMS.map((item, i) => {
          const el = labelRefs.current[i];
          if (!el || !el.offsetWidth) return estimateDims(item);
          return { w: el.offsetWidth + 80, h: item.fontSize * 0.94 };
        }),
      );
    };
    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener("resize", measure);
    return () => {
      alive = false;
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse), (max-width: 900px)");
    const sync = () => setIsTouchLike(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowUp") activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter" && document.activeElement?.tagName !== "BUTTON") {
        playMenuConfirmTick();
        onNavigate?.(ITEMS[active].page);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, activate, onNavigate]);

  return (
    <div className="p3-overlay">
      <div className="p3-name-tag">
        <span>gabriel&apos;s</span>
        <span>portfolio</span>
      </div>

      <nav className="p3-menu" aria-label="Main menu">
        {ITEMS.map((item, i) => {
          const isActive = active === i;
          const dist = Math.abs(i - active);
          const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
          const { w: estW, h: estH } = dims[i];

          return (
            <button
              type="button"
              key={item.id}
              className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
              style={{
                marginRight: item.offsetX,
                marginTop: item.offsetY,
                transitionDelay: mounted ? `${i * 80}ms` : "0ms",
              }}
              onClick={() => {
                if (isTouchLike && !isActive) {
                  activate(i);
                  return;
                }
                playMenuConfirmTick();
                onNavigate?.(item.page);
              }}
              onMouseEnter={() => activate(i)}
              onFocus={() => activate(i)}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="p3-glow" />
              <div
                className="p3-skew-wrap"
                style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
              >
                <div
                  key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                  className={`p3-shadow-tri${isActive ? " pop" : ""}`}
                  style={{
                    width: estW,
                    height: estH,
                    clipPath: clipShape(estW, estH),
                  }}
                />
                <div
                  className="p3-highlight"
                  style={{
                    width: estW,
                    height: estH,
                    clipPath: clipShape(estW, estH),
                    transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                  }}
                />
                <div className="p3-label-wrap" style={{ opacity }}>
                  <span
                    ref={(el) => {
                      labelRefs.current[i] = el;
                    }}
                    className="p3-label-base p3-label-dark"
                    style={{ fontSize: item.fontSize }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="p3-label-base p3-label-bright"
                    style={{
                      fontSize: item.fontSize,
                      clipPath: clipShape(estW, estH),
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
        <div className="p3-hint-row">
          <span className="p3-hint-key">↑↓</span>
          <span>NAVIGATE</span>
        </div>
        <div className="p3-hint-row">
          <span className="p3-hint-key">↵</span>
          <span>CONFIRM</span>
        </div>
      </div>
    </div>
  );
}
