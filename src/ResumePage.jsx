import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick } from "./menuSfx";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-fallback {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 30% 20%, rgba(125, 212, 252, 0.35), transparent 45%),
            linear-gradient(145deg, #0b1748, #1a6aff 55%, #0d1a3a);
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 8vw, 92px);
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 4.5vw, 56px);
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 2.5vw, 28px);
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: clamp(40px, 6vw, 70px);
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(16px, 2.2vw, 28px);
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(46vw, 700px);
          max-height: min(94vh, 940px);
          z-index: 12;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
        }
        .resume-detail-panel-body {
          flex: 1 1 auto;
          min-height: 0;
          max-height: min(94vh, 940px);
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 18px 20px 40px 20px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .resume-detail-panel-body::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        /* Skills: mais linhas — layout mais compacto */
        .resume-detail-panel-body--dense .resume-detail-top {
          min-height: 76px;
          gap: 10px;
        }
        .resume-detail-panel-body--dense .resume-detail-top-index {
          font-size: 40px;
        }
        .resume-detail-panel-body--dense .resume-detail-top-title {
          font-size: clamp(18px, 2.5vw, 34px);
        }
        .resume-detail-panel-body--dense .resume-detail-top-progress {
          font-size: 26px;
        }
        .resume-detail-panel-body--dense .resume-detail-list {
          gap: 6px;
          margin-top: 12px;
        }
        .resume-detail-panel-body--dense .resume-detail-row {
          min-height: 46px;
          gap: 10px;
          padding: 0 10px;
        }
        .resume-detail-panel-body--dense .resume-detail-row-index {
          font-size: 22px;
        }
        .resume-detail-panel-body--dense .resume-detail-row-title {
          font-size: clamp(12px, 1.45vw, 20px);
          line-height: 1.08;
        }
        .resume-detail-panel-body--dense .resume-detail-status {
          font-size: 15px;
          padding: 5px 9px;
        }
        .resume-detail-panel-body--dense .resume-detail-bottom {
          margin-top: 12px;
          padding: 12px 14px;
        }
        .resume-detail-panel-body--dense .resume-detail-bottom-title {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .resume-detail-panel-body--dense .resume-detail-bullets {
          gap: 6px;
        }
        .resume-detail-panel-body--dense .resume-detail-bullet {
          font-size: clamp(10px, 1.15vw, 15px);
          line-height: 1.28;
        }
        .resume-detail-panel-body--dense .resume-cv-row {
          margin-top: 12px;
          gap: 8px;
        }
        .resume-detail-panel-body--dense .resume-cv-btn {
          font-size: 17px;
          letter-spacing: 1.5px;
          padding: 7px 12px;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(22px, 3vw, 42px);
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 2vw, 28px);
          line-height: 1.05;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 18px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: clamp(12px, 1.35vw, 18px);
          line-height: 1.3;
          color: #edfaff;
          padding-bottom: 2px;
        }

        .resume-cv-row {
          position: relative;
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          pointer-events: all;
        }
        .resume-cv-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: 1.8px;
          padding: 8px 15px;
          border: none;
          cursor: pointer;
          color: #041238;
          background: #8df6ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          text-decoration: none;
        }
        .resume-cv-btn.secondary {
          background: #fff;
        }

        @media (max-width: 1100px), (pointer: coarse) {
          .resume-overlay {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 10px 0 18px;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            pointer-events: none;
          }
          .resume-stack {
            position: relative;
            left: auto;
            top: auto;
            width: min(calc(100vw - 16px), 620px);
            transform: none;
            margin: 0 auto;
            flex-shrink: 0;
            pointer-events: none;
          }
          .resume-list-tag {
            margin-left: 0;
            font-size: clamp(40px, 12vw, 72px);
          }
          .resume-card {
            height: auto;
            min-height: 108px;
          }
          .resume-card-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
            padding: 12px 12px 52px 54px;
          }
          .resume-rank {
            align-self: flex-end;
            margin-top: -4px;
          }
          .resume-title {
            font-size: clamp(22px, 6.5vw, 40px);
            max-width: 100%;
          }
          .resume-subtitle-bar {
            left: 50px;
            right: 8px;
            bottom: 8px;
            height: auto;
            min-height: 30px;
            padding: 6px 10px;
            align-items: flex-start;
          }
          .resume-subtitle {
            white-space: normal;
            line-height: 1.2;
            font-size: clamp(11px, 3.4vw, 18px);
          }
          .resume-detail-panel {
            position: relative;
            top: auto;
            right: auto;
            left: auto;
            width: min(calc(100vw - 16px), 620px);
            max-height: none;
            margin: 14px auto 20px;
            flex: 1 1 auto;
            min-height: 0;
            pointer-events: auto;
          }
          .resume-detail-panel-body {
            max-height: none;
          }
          .resume-detail-top {
            grid-template-columns: 56px 1fr 44px;
            gap: 8px;
            padding: 0 12px;
            min-height: 76px;
          }
          .resume-detail-top-index {
            font-size: 36px;
          }
          .resume-detail-top-title {
            font-size: clamp(14px, 4.2vw, 26px);
            word-break: break-word;
            hyphens: auto;
          }
          .resume-detail-top-progress {
            font-size: 24px;
          }
          .resume-detail-row {
            grid-template-columns: 40px 1fr;
            grid-template-rows: auto auto;
            gap: 6px 10px;
            padding: 10px 12px;
            min-height: 0;
            align-items: start;
          }
          .resume-detail-row-index {
            grid-row: 1 / span 2;
            font-size: 20px;
          }
          .resume-detail-row-title {
            grid-column: 2;
            grid-row: 1;
            font-size: clamp(12px, 3.5vw, 20px);
            line-height: 1.15;
            word-break: break-word;
          }
          .resume-detail-status {
            grid-column: 2;
            grid-row: 2;
            justify-self: start;
            font-size: 14px;
            padding: 5px 9px;
          }
          .resume-detail-bullet {
            font-size: clamp(11px, 3.2vw, 16px);
            line-height: 1.35;
          }
          .resume-detail-bottom-title {
            font-size: 22px;
          }
          .resume-detail-panel-body--dense .resume-detail-row {
            grid-template-columns: 36px 1fr;
            gap: 8px 10px;
            padding: 10px 10px;
          }
          .resume-detail-panel-body--dense .resume-detail-row-title {
            font-size: clamp(13px, 3.8vw, 17px);
            line-height: 1.2;
          }
          .resume-detail-panel-body--dense .resume-detail-status {
            font-size: 13px;
            padding: 6px 10px;
          }
          .resume-detail-panel-body--dense .resume-detail-top {
            min-height: 82px;
          }
          .resume-detail-panel-body--dense .resume-detail-top-title {
            font-size: clamp(18px, 5vw, 26px);
          }
          .resume-detail-panel-body--dense .resume-detail-top-index {
            font-size: 38px;
          }
          .resume-detail-panel-body--dense .resume-detail-list {
            gap: 8px;
          }
          .resume-detail-panel-body--dense .resume-detail-bullet {
            font-size: clamp(12px, 3.4vw, 16px);
          }
        }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive((prev) => {
                  if (prev !== index) playMenuNavTick();
                  return index;
                });
              }}
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
            </div>
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
