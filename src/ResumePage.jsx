import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick } from "./menuSfx";
import "./styles/resume.css";

const CV_PATH = "/gabriel-cv-us.pdf";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "SENAC · Unibra · Porto Digital", rank: 1 },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "Web · Mobile · APIs", rank: 2 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "Repos & coursework", rank: 3 },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "Tutor · Hospitality", rank: 4 },
];

const EDUCATION_ROWS = [
  { index: "01", title: "Systems Analysis & Development", status: "2024–26" },
  { index: "02", title: "Bachelor's in Biomedicine — Unibra", status: "2021–23" },
  { index: "03", title: "High School — EREM Porto Digital", status: "2013–15" },
];

const SKILL_GROUPS = [
  { index: "01", title: "Python · Kotlin/Java · REST APIs", status: "core" },
  { index: "02", title: "Firebase · SQLite/Room · Git/GitHub", status: "stack" },
  { index: "03", title: "React · Vite · React Router · Framer Motion", status: "web" },
  { index: "04", title: "ESLint · Postman · Flask · SQLAlchemy", status: "tooling" },
  { index: "05", title: "Unit testing · QA mindset", status: "quality" },
];

const PROJECT_ROWS = [
  { index: "01", title: "Feira-PLUS — wholesale shopping UX", status: "GitHub" },
  { index: "02", title: "BooksAPI — Flask + Swagger + tests", status: "GitHub" },
  { index: "03", title: "Estabelecimentos Credenciados — BC data", status: "GitHub" },
  { index: "04", title: "QA4 — calculator + unittest", status: "GitHub" },
  { index: "05", title: "Canes Compliance / ReciELO — SENAC", status: "Academic" },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "Tutor — History & English (2020–22)", status: "done" },
  { index: "02", title: "Bartender — Mr. Hoppi (2018–19)", status: "done" },
  { index: "03", title: "Waiter — Mr. Hoppi (2016–18)", status: "done" },
  { index: "04", title: "Tutor — Elementary (2016–18)", status: "done" },
];

export default function ResumePage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
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
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const rowsForActive = () => {
    if (active === 0) return EDUCATION_ROWS;
    if (active === 1) return SKILL_GROUPS;
    if (active === 2) return PROJECT_ROWS;
    return EXPERIENCE_ROWS;
  };

  const panelTitle = () => {
    if (active === 0) return "EDUCATION LOG";
    if (active === 1) return "SKILL MATRIX";
    if (active === 2) return "PROJECT INDEX";
    return "EXPERIENCE LOG";
  };

  const bulletsForActive = () => {
    if (active === 0) {
      return [
        "- Technologist track at Faculdade SENAC PE with practical software projects.",
        "- Biomedical sciences background: methodology, data rigor, compliance mindset.",
        "- Technology-oriented high school foundation in Recife.",
      ];
    }
    if (active === 1) {
      return [
        "- Android foundations with Kotlin/Java; REST integrations and persistence.",
        "- Front-end: React + Vite + React Router + Framer Motion + ESLint on this portfolio; Caminho das Constelações is another Render-hosted web project I ship end-to-end.",
        "- Python ecosystem for APIs, scripting, and academic tooling (Flask, SQLAlchemy, tests).",
        "- Soft focus: discipline, communication, teamwork, fast learning.",
      ];
    }
    if (active === 2) {
      return [
        "- Featured repos align with mobile, APIs, data practice, and QA.",
        "- Integrative projects: LGPD/compliance governance (Canes, ReciELO).",
        "- More on GitHub: github.com/Biieru",
      ];
    }
    return [
      "- Tutoring strengthened explanation, patience, and knowledge transfer.",
      "- Hospitality roles built speed, precision, and service under pressure.",
      "- Combined: communication + reliability for software teams.",
    ];
  };

  return (
    <div id="menu-screen">
      <div className="menu-backdrop" aria-hidden>
        <div className="menu-backdrop__grad" />
        <div className="menu-backdrop__grid" />
      </div>
      <div className="resume-entry-mask" aria-hidden="true">
        <div className="resume-entry-fallback" />
      </div>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              aria-pressed={active === index}
              onMouseEnter={() => {
                setActive((prev) => {
                  if (prev !== index) playMenuNavTick();
                  return index;
                });
              }}
              onFocus={() => setActive(index)}
              onClick={() => {
                setActive((prev) => {
                  if (prev !== index) playMenuNavTick();
                  return index;
                });
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="resume-detail-panel">
          <div className={`resume-detail-panel-body${active === 1 ? " resume-detail-panel-body--dense" : ""}`}>
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">0{active + 1}</div>
              <div className="resume-detail-top-title">{panelTitle()}</div>
              <div className="resume-detail-top-progress">{ITEMS[active].badge}</div>
            </div>

            <div className="resume-detail-list">
              {rowsForActive().map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                {bulletsForActive().map((b, i) => (
                  <div className="resume-detail-bullet" key={i}>
                    {b}
                  </div>
                ))}
              </div>
              <div className="resume-cv-row">
                <a className="resume-cv-btn" href={CV_PATH} download>
                  DOWNLOAD CV (PDF)
                </a>
                <a className="resume-cv-btn secondary" href={CV_PATH} target="_blank" rel="noopener noreferrer">
                  OPEN CV IN TAB
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
