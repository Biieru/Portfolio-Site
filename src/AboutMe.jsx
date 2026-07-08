import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick } from "./menuSfx";
import "./styles/sc-shared.css";
import "./styles/about.css";

const REVEAL_CONTENT = [
  {
    upper: [
      "Gabriel Araujo — developer (Android-minded, APIs, quality)",
      "Systems Analysis & Development (technologist) · Faculdade SENAC PE · studying since Feb 2024",
      "Mobile & back-end: Kotlin/Java, Python, REST, Room/SQLite, Git/GitHub",
      "This portfolio: React 19, Vite, React Router, Framer Motion, ESLint — static build, SPA routing, motion UI",
      "Also: Postman, Flask, SQLAlchemy; tests, readable integrations, pragmatic delivery under deadlines",
    ],
    lower: "For contact and more, check the Socials page",
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

const ROLES = ["LEADER", "PARTY", "PARTY"];

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
    const step = (delta) => {
      setActive((i) => {
        const n = Math.min(ITEMS.length - 1, Math.max(0, i + delta));
        if (n !== i) playMenuNavTick();
        return n;
      });
    };
    const onKey = (e) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      if (e.key === "ArrowUp" || key === "q") step(-1);
      if (e.key === "ArrowDown" || key === "e") step(1);
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
    <div id="menu-screen" className="screen-about">
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
        <div key={`nav-${active}`} className="sc-right-nav" aria-hidden>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">Q</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">E</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      <nav className="sc-root" aria-label="About sections">
        {ITEMS.map((item, i) => (
          <button
            type="button"
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            aria-expanded={revealed && active === i}
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
            onFocus={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i]}</div>
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
          </button>
        ))}
      </nav>

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
