import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    title: "FEIRA-PLUS",
    type: "FRONTEND / MOBILE",
    summary:
      "Smart wholesale shopping list: aisle-based organization, accessibility-focused UI, TXT/JPG export.",
    stack: "React · Vite · Capacitor · localStorage",
    href: "https://github.com/Biieru/Feira-PLUS",
  },
  {
    title: "BOOKSAPI",
    type: "BACK-END / API",
    summary:
      "REST API for books with CRUD, Swagger, automated tests, and SQLite via SQLAlchemy.",
    stack: "Flask · SQLAlchemy · Flasgger · pytest",
    href: "https://github.com/Biieru/BooksAPI",
  },
  {
    title: "ACCREDITED ESTABLISHMENTS",
    type: "DATA / PYTHON",
    summary: "Query and management of accredited establishments using Central Bank data.",
    stack: "Python · web interface",
    href: "https://github.com/Biieru/EstabelecimentosCredenciados",
  },
  {
    title: "QA4",
    type: "TESTING / QA",
    summary:
      "Calculator with Python unit tests (positive and negative cases, division by zero).",
    stack: "Python · unittest",
    href: "https://github.com/Biieru/QA4",
  },
];

const CREATIVE = [
  {
    title: "THE WAY OF THE GUARDIANS",
    summary:
      "Mythological RPG concept, turn-based tactical combat, 16-bit-inspired presentation.",
    href: "https://sites.google.com/view/gabriel-resume/game-projects/way-of-the-guardians",
    linkLabel: "READ ON GOOGLE SITES →",
  },
  {
    title: "YOU, WHO TAUGHT ME HOW TO LOVE",
    summary:
      "Immortal character narrative — memory, sacrifice, and moral dilemmas.",
    href: "https://sites.google.com/view/gabriel-resume/game-projects/you-who-taught-me-how-to-love",
    linkLabel: "READ ON GOOGLE SITES →",
  },
  {
    title: "PATH OF THE CONSTELLATIONS",
    summary:
      "Published RPG site with themed atmosphere and navigation.",
    href: "https://caminho-das-constelacoes.onrender.com/",
    linkLabel: "VISIT SITE →",
  },
];

export default function ProjectsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <div className="menu-backdrop" aria-hidden>
        <div className="menu-backdrop__grad" />
        <div className="menu-backdrop__grid" />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;500&display=swap');

        .proj-root {
          position: absolute;
          inset: 0;
          z-index: 12;
          overflow: auto;
          padding: 6vh 5vw 9vh;
          pointer-events: all;
        }
        .proj-head {
          font-family: 'Anton', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          color: #f6fbff;
          letter-spacing: 2px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.2);
          margin-bottom: 28px;
        }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .proj-card {
          background: rgba(8, 18, 72, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.14), 0 12px 30px rgba(0,0,0,0.45);
          padding: 18px 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 160px;
        }
        .proj-card h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 3px;
          color: #a5f6ff;
        }
        .proj-badge {
          align-self: flex-start;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          padding: 3px 10px;
          color: #041238;
          background: #8df6ff;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 100%, 6px 100%);
        }
        .proj-card p {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 1.65;
          color: rgba(255,255,255,0.62);
          flex: 1;
        }
        .proj-stack {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(125, 212, 252, 0.85);
        }
        .proj-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 3px;
          color: #ff6a88;
          text-decoration: none;
          margin-top: 4px;
        }
        .proj-link:hover { color: #ffb3c7; }

        .proj-section-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          color: #f6fbff;
          margin: 10px 0 14px;
          letter-spacing: 2px;
        }

        .proj-footer {
          position: fixed;
          bottom: 20px;
          right: 28px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
          z-index: 20;
        }
      `}</style>

      <div className="proj-root">
        <div className="proj-head">SIDE PROJECTS</div>

        <div className="proj-section-title">FEATURED REPOS</div>
        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <article className="proj-card" key={p.title}>
              <span className="proj-badge">{p.type}</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <div className="proj-stack">{p.stack}</div>
              <a className="proj-link" href={p.href} target="_blank" rel="noopener noreferrer">
                VIEW REPO →
              </a>
            </article>
          ))}
        </div>

        <div className="proj-section-title">CREATIVE (CONCEPTS)</div>
        <div className="proj-grid">
          {CREATIVE.map((c) => (
            <article className="proj-card" key={c.title}>
              <span className="proj-badge">GAME / NARRATIVE</span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <a className="proj-link" href={c.href} target="_blank" rel="noopener noreferrer">
                {c.linkLabel}
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="proj-footer">
        <span>← / ESC / BACKSPACE — BACK</span>
      </div>
    </div>
  );
}
