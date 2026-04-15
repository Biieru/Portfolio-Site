import { useState, useEffect, useCallback } from "react";
import { playMenuConfirmTick, playMenuNavTick } from "./menuSfx";

const ITEMS = [
  { id: "about", label: "ABOUT ME", page: "about", fontSize: 80, offsetX: 0, offsetY: 0, skew: -6, skewY: 10 },
  { id: "resume", label: "RESUME", page: "resume", fontSize: 66, offsetX: 20, offsetY: 8, skew: -11, skewY: -10 },
  { id: "github", label: "GITHUB LINK", page: "github", fontSize: 68, offsetX: 8, offsetY: 6, skew: 0, skewY: -4 },
  { id: "socials", label: "SOCIALS", page: "socials", fontSize: 74, offsetX: 16, offsetY: 8, skew: -3, skewY: 5 },
  { id: "projects", label: "SIDE PROJECTS", page: "projects", fontSize: 56, offsetX: 10, offsetY: 6, skew: -4, skewY: 7 },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function P3Menu({
  onNavigate,
  onActiveChange,
  initialActive = 0,
  bgmVolume = 0.25,
  bgmMuted = false,
  onToggleMute,
  onVolumeChange,
}) {
  const [active, setActive] = useState(initialActive);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

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

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowUp") activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter") {
        playMenuConfirmTick();
        onNavigate?.(ITEMS[active].page);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, activate, onNavigate]);

  return (
    <>
      <style>{`
        .p3-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .p3-menu {
          position: relative;
          z-index: 20;
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: all;
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .p3-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .p3-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(255,100,180,0.35) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .p3-row.active .p3-glow { opacity: 1; }

        .p3-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        @keyframes p3-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .p3-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(235, 80, 120, 0.85);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p3-shadow-tri.pop {
          animation: p3-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p3-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }

        .p3-label-wrap {
          position: relative;
          z-index: 3;
        }

        .p3-label-base {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
        }

        .p3-label-dark {
          color: #3ce2ff;
          transition: color 0.12s ease;
        }
        .p3-row.active .p3-label-dark { color: #6b0010; }
        .p3-row:hover:not(.active) .p3-label-dark { color: #00d9ff; }

        .p3-label-bright {
          color: #ff2a2a;
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
        }
        .p3-row.active .p3-label-bright { opacity: 1; }

        .p3-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .p3-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .p3-audio-indicator {
          position: absolute;
          right: 26px;
          bottom: 74px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.58);
          font-family: 'Anton', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          opacity: 0;
          transition: opacity 0.5s ease 1s;
          padding: 0;
          pointer-events: all;
          text-shadow: 0 0 8px rgba(10, 35, 90, 0.55);
        }
        .p3-audio-indicator.mounted { opacity: 1; }
        .p3-audio-toggle {
          border: 0;
          background: transparent;
          color: inherit;
          padding: 0;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font: inherit;
          letter-spacing: 2px;
        }
        .p3-audio-icon {
          width: 20px;
          height: 20px;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          line-height: 1;
        }
        .p3-audio-volume {
          width: 74px;
          accent-color: #53edff;
          cursor: pointer;
        }
        .p3-audio-volume:focus-visible,
        .p3-audio-toggle:focus-visible {
          outline: 2px solid rgba(125, 212, 252, 0.8);
          outline-offset: 2px;
        }

        .p3-name-tag {
          position: absolute;
          top: 34px;
          left: 42px;
          z-index: 20;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: clamp(36px, 5.4vw, 74px);
          line-height: 0.95;
          letter-spacing: 2px;
          color: rgba(10, 10, 14, 0.64);
          transform: rotate(12deg);
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .p3-name-tag span:first-child {
          color: rgba(0, 0, 0, 0.86);
        }
      `}</style>

      <div className="p3-overlay">
        <div className="p3-name-tag">
          <span>gabriel&apos;s</span>
          <span>portfolio</span>
        </div>

        <nav className="p3-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <a
                key={item.id}
                href="#"
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginRight: item.offsetX,
                  marginTop: item.offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  playMenuConfirmTick();
                  onNavigate?.(item.page);
                }}
                onMouseEnter={() => activate(i)}
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
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="p3-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="p3-label-wrap" style={{ opacity }}>
                    <span className="p3-label-base p3-label-dark" style={{ fontSize: item.fontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="p3-label-base p3-label-bright"
                      style={{
                        fontSize: item.fontSize,
                        clipPath: clipFn(estW, estH),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </a>
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
        <div className={`p3-audio-indicator ${mounted ? "mounted" : ""}`} aria-label="audio controls">
          <button
            type="button"
            className="p3-audio-toggle"
            onClick={onToggleMute}
            aria-label={bgmMuted ? "unmute background music" : "mute background music"}
            title={bgmMuted ? "Unmute" : "Mute"}
          >
            <span className="p3-audio-icon">{bgmMuted ? "🔇" : "🔊"}</span>
            <span>{bgmMuted ? "MUTED" : "BGM"}</span>
          </button>
          <input
            className="p3-audio-volume"
            type="range"
            min="0"
            max="100"
            step="1"
            value={Math.round(bgmVolume * 100)}
            onChange={(e) => onVolumeChange?.(Number(e.target.value) / 100)}
            aria-label="background music volume"
            title="Volume"
          />
        </div>
      </div>
    </>
  );
}
