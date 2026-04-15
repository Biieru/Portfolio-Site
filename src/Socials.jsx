import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick } from "./menuSfx";

const PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "github",
    label: "GITHUB",
    handle: "@Biieru",
    href: "https://github.com/Biieru",
    icon: "⌘",
    barIcon: PIXEL,
    bars: 1,
    newBars: [],
    links: ["github.com/Biieru"],
    counts: ["repos"],
    stats: [
      { tag: "DEV", value: "OSS", color: "#53edff" },
      { tag: "SRC", value: "GIT", color: "#7dd4fc" },
    ],
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "in/gabrielcaraujo",
    href: "https://www.linkedin.com/in/gabrielcaraujo",
    icon: "in",
    barIcon: PIXEL,
    bars: 1,
    newBars: [],
    links: ["linkedin.com/in/gabrielcaraujo"],
    counts: ["profile"],
    stats: [
      { tag: "NET", value: "PRO", color: "#53edff" },
      { tag: "CV", value: "ON", color: "#7dd4fc" },
    ],
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    handle: "@bordercansado",
    href: "https://instagram.com/bordercansado",
    icon: "◎",
    barIcon: PIXEL,
    bars: 1,
    newBars: [],
    links: ["instagram.com/bordercansado"],
    counts: ["media"],
    stats: [
      { tag: "VIS", value: "NEW", color: "#53edff" },
      { tag: "FEED", value: "IG", color: "#7dd4fc" },
    ],
  },
];

export default function Socials() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus] = useState("left");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp") {
          setActive((i) => {
            const n = Math.max(0, i - 1);
            if (n !== i) playMenuNavTick();
            return n;
          });
        }
        if (e.key === "ArrowDown") {
          setActive((i) => {
            const n = Math.min(ITEMS.length - 1, i + 1);
            if (n !== i) playMenuNavTick();
            return n;
          });
        }
        if (e.key === "ArrowRight") {
          playMenuNavTick();
          setFocus("right");
          setActiveInfoBar(0);
        }
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank", "noopener,noreferrer");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp") {
          setActiveInfoBar((i) => {
            const n = Math.max(0, i - 1);
            if (n !== i) playMenuNavTick();
            return n;
          });
        }
        if (e.key === "ArrowDown") {
          setActiveInfoBar((i) => {
            const n = Math.min(barCount - 1, i + 1);
            if (n !== i) playMenuNavTick();
            return n;
          });
        }
        if (e.key === "ArrowLeft") {
          playMenuNavTick();
          setFocus("left");
        }
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank", "noopener,noreferrer");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus]);

  return (
    <div id="menu-screen">
      <div className="menu-backdrop" aria-hidden>
        <div className="menu-backdrop__grad" />
        <div className="menu-backdrop__grid" />
      </div>
      <div className="socials-portrait-shell" aria-hidden>
        <img className="menu-portrait" src="/images/socials-portrait.png" alt="" />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }

        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 5vw, 50px);
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(20px, 3.2vw, 28px);
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 50;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 8vw, 100px);
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #111;
          padding: 0 8px;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-bar-wrap {
          position: fixed;
          right: 0;
          left: 58%;
          height: 46px;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 50;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;
          border-radius: 7px;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(14px, 2vw, 22px);
          letter-spacing: 2px;
          color: #111;
          padding: 0 14px;
          user-select: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sc-info-bar-box {
          height: 70%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 6px;
          margin-right: 4px;
          user-select: none;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: 14px;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #111;
          margin-right: 24px;
          flex-shrink: 0;
          user-select: none;
        }

        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        @media (max-width: 720px) {
          .sc-bar,
          .sc-bar-red {
            width: min(94vw, 420px);
          }
          .sc-bar-outer.active .sc-bar-fill {
            clip-path: polygon(18% 0, 100% 0, calc(100% - 12px) 100%, calc(18% + min(28vw, 120px)) 100%);
          }
          .sc-bar-content {
            padding: 0 8px 0 4px;
            gap: 2px;
          }
          .sc-role {
            font-size: clamp(16px, 5.5vw, 28px);
            padding: 0 6px 0 2px;
            transform: rotate(-22deg);
          }
          .sc-main {
            min-width: 0;
            flex: 1 1 auto;
          }
          .sc-label {
            font-size: clamp(12px, 3.8vw, 18px);
            letter-spacing: 1.5px;
          }
          .sc-stats {
            padding-right: 6px;
            gap: 4px;
          }
          .sc-stat-num {
            font-size: clamp(15px, 3.8vw, 20px);
          }
          .sc-stat-tag {
            font-size: 8px;
            letter-spacing: 1px;
          }
          .sc-right-nav {
            top: 10px;
            left: 8px;
            right: 8px;
            width: auto;
            justify-content: center;
            flex-wrap: wrap;
            gap: 4px;
            padding: 0 4px;
          }
          .sc-right-nav .sc-nav-btn {
            font-size: clamp(26px, 8vw, 48px);
          }
          .sc-right-nav .sc-nav-label {
            font-size: clamp(14px, 4.5vw, 20px);
            color: #fff;
            -webkit-text-stroke: 1px #000;
            paint-order: stroke fill;
          }
          .sc-info-bar-wrap {
            left: 10px !important;
            right: 10px !important;
            width: auto !important;
            top: 72px !important;
            height: auto;
            min-height: 42px;
          }
          .sc-info-bar-text {
            font-size: clamp(11px, 3.2vw, 16px);
            letter-spacing: 1px;
          }
          .sc-info-bar-box {
            font-size: clamp(12px, 3vw, 16px);
            padding: 0 8px;
          }
          .sc-info-bar-count {
            font-size: clamp(14px, 3.5vw, 18px);
            margin-right: 8px;
          }
          .sc-footer {
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank", "noopener,noreferrer");
              else {
                setActive((prev) => {
                  if (prev !== i) playMenuNavTick();
                  return i;
                });
              }
            }}
            onMouseEnter={() => {
              setActive((prev) => {
                if (prev !== i) playMenuNavTick();
                return i;
              });
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map((s) => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>
                          {s.tag}
                        </span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted &&
        Array.from({ length: ITEMS[active].bars }).map((_, i) => (
          <div
            className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
            key={`bar-${active}-${i}`}
            style={{ top: `${155 + i * 52}px`, animationDelay: `${i * 50}ms` }}
            onClick={() => {
              setActiveInfoBar((prev) => {
                if (prev !== i) playMenuNavTick();
                return i;
              });
            }}
            onMouseEnter={() => {
              setActiveInfoBar((prev) => {
                if (prev !== i) playMenuNavTick();
                return i;
              });
            }}
          >
            <div className="sc-info-bar">
              <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} alt="" />
              <span className="sc-info-bar-text">{ITEMS[active].links[i]}</span>
              <span className="sc-info-bar-box">LINK</span>
              <span className="sc-info-bar-count">{ITEMS[active].counts[i]}</span>
            </div>
          </div>
        ))}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↵</span>
          <span>OPEN</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>
    </div>
  );
}
