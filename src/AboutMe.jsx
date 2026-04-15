import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick } from "./menuSfx";

const REVEAL_CONTENT = [
  {
    upper: [
      "Gabriel Araujo — developer (Android-minded, APIs, quality)",
      "Systems Analysis & Development (technologist) · Faculdade SENAC PE · studying since Feb 2024",
      "Mobile & back-end: Kotlin/Java, Python, REST, Room/SQLite, Git/GitHub",
      "This portfolio: React 19, Vite, React Router, Framer Motion, ESLint — static build, SPA routing, motion UI",
      "Also: Postman, Flask, SQLAlchemy; tests, readable integrations, pragmatic delivery under deadlines",
    ],
    lower: "For more information look on socials",
  },
  {
    upper: [
      "Since I was a kid I've cared about systems and code — but games were the real hook.",
      "Games got me fluent in English, friendships abroad, and a habit of always wanting to level up.",
      "First tools: RPG Maker, Game Maker, WC3 World Editor — messing with worlds before \"career\" was a word.",
      "In high school I ran long RPG tables; one campaign went so far I wanted code to beat what the table could do.",
      "After school I studied software on my own, game-first — then SENAC formalized the path.",
      "Design side: Photoscape since 2008; since 2024, Photoshop & Illustrator for art, UI, and storytelling.",
    ],
    lower:
      "still the same thread: curiosity, narrative, and building things people can feel",
  },
  {
    upper: [
      "Creative lane: game design, narrative systems, worldbuilding on the side",
      "Shipped web experiment: Caminho das Constelações (tabletop-style RPG companion)",
      "Writing concepts in the drawer: The Way of the Guardians · You, Who Taught Me How to Love",
      "Longer write-ups & older portfolio context live on Google Sites",
      "Academic integrations touched LGPD-style governance (Canes / ReciELO) — narrative + rules",
    ],
    lower:
      "play: caminho-das-constelacoes.onrender.com · read: sites.google.com/view/gabriel-resume",
  },
];

const ROLES = [{ text: "LEADER" }, { text: "PARTY" }, { text: "PARTY" }];

const ITEMS = [
  {
    id: "profile",
    label: "PROFILE",
    stats: [
      { tag: "DEV", value: "001", color: "#53edff" },
      { tag: "PE", value: "REC", color: "#7dd4fc" },
    ],
  },
  {
    id: "background",
    label: "BACKGROUND",
    stats: [
      { tag: "LANG", value: "EN+", color: "#53edff" },
      { tag: "GAME", value: "ON", color: "#7dd4fc" },
    ],
  },
  {
    id: "creative",
    label: "CREATIVE",
    stats: [
      { tag: "SYS", value: "NAR", color: "#53edff" },
      { tag: "PIX", value: "16b", color: "#7dd4fc" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
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
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, revealed]);

  return (
    <div id="menu-screen">
      <div className="menu-backdrop" aria-hidden>
        <div className="menu-backdrop__grad" />
        <div className="menu-backdrop__grid" />
      </div>
      <div className="about-portrait-shell" aria-hidden>
        <img className="menu-portrait" src="/images/about-portrait.png" alt="" />
      </div>
      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line, lineIdx) => (
              <div className="sc-reveal-upper-line" key={`${ITEMS[active].id}-${lineIdx}`}>
                {line}
              </div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300&display=swap');

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes sc-reveal-bar-in {
          0% { opacity: 0; transform: translateX(-120px) rotate(-20deg) scaleX(0.72); }
          60% { opacity: 0.96; transform: translateX(18px) rotate(-20deg) scaleX(1.03); }
          100% { opacity: 0.92; transform: translateX(0) rotate(-20deg) scaleX(1); }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 8%;
          left: 0%;
          width: 100%;
          height: 54%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #fff;
          text-align: center;
          padding: 6px 14px 8px;
          overflow-y: auto;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: clamp(11px, 1.75vw, 17px);
          letter-spacing: 0.45px;
          line-height: 1.22;
          max-width: 52em;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 64%;
          right: 0;
          width: 56%;
          height: 18%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: clamp(11px, 1.65vw, 18px);
          letter-spacing: 0.4px;
          padding: 8px 18px 8px 22px;
          line-height: 1.25;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 10vw, 100px);
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
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
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

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 6;
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
          padding-left: 24px;
        }

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

        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
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

        @media (max-width: 1100px), (pointer: coarse) {
          .about-portrait-shell {
            opacity: 0.2;
            right: -20vw;
            width: 96vw;
          }
          .sc-root {
            justify-content: flex-start;
            padding-top: 22vh;
            gap: 10px;
          }
          .sc-bar,
          .sc-bar-red {
            width: min(96vw, 520px);
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
            padding-left: 4px;
            min-width: 0;
          }
          .sc-label {
            font-size: clamp(13px, 4.2vw, 20px);
            letter-spacing: 1.5px;
          }
          .sc-stats {
            padding-right: 6px;
            gap: 4px;
            flex-shrink: 0;
          }
          .sc-stat-num {
            font-size: clamp(16px, 4vw, 22px);
          }
          .sc-stat-tag {
            font-size: 8px;
            letter-spacing: 1px;
          }
          .sc-reveal-panel {
            left: 2vw;
            right: 2vw;
            width: auto;
            top: 18vh;
            height: auto;
            min-height: 52vh;
            clip-path: none;
            border-radius: 10px;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
            transform: none;
            transform-origin: center;
          }
          .sc-reveal-panel.mounted {
            animation: none;
            opacity: 0.94;
            transform: none !important;
          }
          .sc-reveal-panel::before {
            clip-path: none;
            border-radius: 10px 10px 0 0;
          }
          .sc-reveal-upper-bar {
            position: static;
            width: 100%;
            height: auto;
            min-height: 34vh;
            clip-path: none;
            padding: 20px 14px 12px;
            gap: 10px;
          }
          .sc-reveal-upper-line {
            font-size: clamp(13px, 3.6vw, 16px);
            line-height: 1.3;
            max-width: 100%;
          }
          .sc-reveal-lower-bar {
            position: static;
            width: calc(100% - 20px);
            margin: 12px 10px 12px;
            height: auto;
            clip-path: none;
            border-radius: 8px;
            font-size: clamp(12px, 3.4vw, 14px);
            padding: 10px 12px;
          }
          .sc-right-nav {
            display: none;
          }
          .sc-right-nav .sc-nav-btn {
            font-size: clamp(28px, 9vw, 56px);
          }
          .sc-footer {
            bottom: 12px;
            right: 12px;
          }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              const isSameItem = active === i;
              setActive((prev) => {
                if (prev !== i) playMenuNavTick();
                return i;
              });
              if (isSameItem) {
                setRevealed((prev) => !prev);
              } else {
                setRevealed(true);
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
                  <div className="sc-label">{item.label}</div>
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

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↵</span>
          <span>REVEAL</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>
    </div>
  );
}
