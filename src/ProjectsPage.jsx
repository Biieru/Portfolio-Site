import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuNavTick, playMenuConfirmTick } from "./menuSfx";
import "./styles/projects.css";

const PROJECTS = [
  {
    title: "FEIRA-PLUS",
    type: "FRONTEND / MOBILE",
    summary:
      "Smart wholesale shopping list: aisle-based organization, accessibility-focused UI, TXT/JPG export.",
    stack: "React · Vite · Capacitor · localStorage",
    href: "https://github.com/Biieru/Feira-PLUS",
    linkLabel: "VIEW REPO →",
  },
  {
    title: "BOOKSAPI",
    type: "BACK-END / API",
    summary:
      "REST API for books with CRUD, Swagger, automated tests, and SQLite via SQLAlchemy.",
    stack: "Flask · SQLAlchemy · Flasgger · pytest",
    href: "https://github.com/Biieru/BooksAPI",
    linkLabel: "VIEW REPO →",
  },
  {
    title: "ACCREDITED ESTABLISHMENTS",
    type: "DATA / PYTHON",
    summary: "Query and management of accredited establishments using Central Bank data.",
    stack: "Python · web interface",
    href: "https://github.com/Biieru/EstabelecimentosCredenciados",
    linkLabel: "VIEW REPO →",
  },
  {
    title: "QA4",
    type: "TESTING / QA",
    summary:
      "Calculator with Python unit tests (positive and negative cases, division by zero).",
    stack: "Python · unittest",
    href: "https://github.com/Biieru/QA4",
    linkLabel: "VIEW REPO →",
  },
];

const CREATIVE = [
  {
    title: "THE WAY OF THE GUARDIANS",
    type: "GAME / NARRATIVE",
    summary:
      "Mythological RPG concept, turn-based tactical combat, 16-bit-inspired presentation.",
    href: "https://sites.google.com/view/gabriel-resume/game-projects/way-of-the-guardians",
    linkLabel: "READ ON GOOGLE SITES →",
  },
  {
    title: "YOU, WHO TAUGHT ME HOW TO LOVE",
    type: "GAME / NARRATIVE",
    summary:
      "Immortal character narrative — memory, sacrifice, and moral dilemmas.",
    href: "https://sites.google.com/view/gabriel-resume/game-projects/you-who-taught-me-how-to-love",
    linkLabel: "READ ON GOOGLE SITES →",
  },
  {
    title: "PATH OF THE CONSTELLATIONS",
    type: "GAME / NARRATIVE",
    summary:
      "Published RPG site with themed atmosphere and navigation.",
    href: "https://caminho-das-constelacoes.onrender.com/",
    linkLabel: "VISIT SITE →",
  },
];

function ProjectCard({ project, index, mounted }) {
  return (
    <a
      className={`proj-card${mounted ? " mounted" : ""}`}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transitionDelay: mounted ? `${index * 60}ms` : "0ms" }}
      onMouseEnter={() => playMenuNavTick()}
      onClick={() => playMenuConfirmTick()}
    >
      <span className="proj-badge">{project.type}</span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      {project.stack && <div className="proj-stack">{project.stack}</div>}
      <span className="proj-link">{project.linkLabel}</span>
    </a>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

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

      <div className="proj-root">
        <div className="proj-head">SIDE PROJECTS</div>

        <div className="proj-section-title">FEATURED REPOS</div>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard project={p} index={i} mounted={mounted} key={p.title} />
          ))}
        </div>

        <div className="proj-section-title">CREATIVE (CONCEPTS)</div>
        <div className="proj-grid">
          {CREATIVE.map((c, i) => (
            <ProjectCard project={c} index={PROJECTS.length + i} mounted={mounted} key={c.title} />
          ))}
        </div>
      </div>

      <div className="proj-footer">
        <span>← / ESC / BACKSPACE — BACK</span>
      </div>
    </div>
  );
}
