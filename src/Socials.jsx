import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick, playMenuConfirmTick } from "./menuSfx";
import { GitHubIcon, LinkedInIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import "./styles/sc-shared.css";
import "./styles/socials.css";

const ITEMS = [
  {
    id: "github",
    label: "GITHUB",
    role: "LEADER",
    href: "https://github.com/Biieru",
    Icon: GitHubIcon,
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
    role: "PARTY",
    href: "https://www.linkedin.com/in/gabrielcaraujo",
    Icon: LinkedInIcon,
    links: ["linkedin.com/in/gabrielcaraujo"],
    counts: ["profile"],
    stats: [
      { tag: "NET", value: "PRO", color: "#53edff" },
      { tag: "CV", value: "ON", color: "#7dd4fc" },
    ],
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
    role: "SUPPORT",
    href: "https://wa.me/5581986646327",
    Icon: WhatsAppIcon,
    links: ["wa.me — direct chat"],
    counts: ["chat"],
    stats: [
      { tag: "MSG", value: "24H", color: "#53edff" },
      { tag: "BR", value: "+55", color: "#7dd4fc" },
    ],
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    role: "PARTY",
    href: "https://instagram.com/bordercansado",
    Icon: InstagramIcon,
    links: ["instagram.com/bordercansado"],
    counts: ["media"],
    stats: [
      { tag: "VIS", value: "NEW", color: "#53edff" },
      { tag: "FEED", value: "IG", color: "#7dd4fc" },
    ],
  },
];

function openSocial(item) {
  playMenuConfirmTick();
  window.open(item.href, "_blank", "noopener,noreferrer");
}

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
    const stepActive = (delta) => {
      setActive((i) => {
        const n = Math.min(ITEMS.length - 1, Math.max(0, i + delta));
        if (n !== i) playMenuNavTick();
        return n;
      });
    };
    const onKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === "q") stepActive(-1);
      if (key === "e") stepActive(1);
      if (focus === "left") {
        if (e.key === "ArrowUp") stepActive(-1);
        if (e.key === "ArrowDown") stepActive(1);
        if (e.key === "ArrowRight") {
          playMenuNavTick();
          setFocus("right");
          setActiveInfoBar(0);
        }
        if (e.key === "Enter") openSocial(ITEMS[active]);
      } else {
        const barCount = ITEMS[active].links.length;
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
        if (e.key === "Enter") openSocial(ITEMS[active]);
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus]);

  return (
    <div id="menu-screen" className="screen-socials">
      <div className="menu-backdrop" aria-hidden>
        <div className="menu-backdrop__grad" />
        <div className="menu-backdrop__grid" />
      </div>
      <div className="socials-portrait-shell" aria-hidden>
        <img className="menu-portrait" src="/images/socials-portrait.png" alt="" />
      </div>

      <nav className="sc-root" aria-label="Social links">
        {ITEMS.map((item, i) => (
          <button
            type="button"
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            aria-label={`${item.label} — ${item.links[0]}`}
            onClick={() => {
              if (active === i) openSocial(item);
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
            onFocus={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{item.role}</div>
                <div className="sc-main">
                  <div className="sc-main-top" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="sc-icon">
                      <item.Icon />
                    </span>
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
          </button>
        ))}
      </nav>

      {mounted && (
        <div className="sc-right-nav" key={active} aria-hidden>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">Q</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">E</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted &&
        ITEMS[active].links.map((link, i) => (
          <button
            type="button"
            className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
            key={`bar-${active}-${i}`}
            style={{ top: `${155 + i * 52}px`, animationDelay: `${i * 50}ms` }}
            onClick={() => openSocial(ITEMS[active])}
            onMouseEnter={() => {
              setActiveInfoBar((prev) => {
                if (prev !== i) playMenuNavTick();
                return i;
              });
            }}
          >
            <div className="sc-info-bar">
              <span className="sc-info-bar-icon">
                {(() => {
                  const Icon = ITEMS[active].Icon;
                  return <Icon />;
                })()}
              </span>
              <span className="sc-info-bar-text">{link}</span>
              <span className="sc-info-bar-box">LINK</span>
              <span className="sc-info-bar-count">{ITEMS[active].counts[i]}</span>
            </div>
          </button>
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
