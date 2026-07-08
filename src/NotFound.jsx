import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playMenuConfirmTick } from "./menuSfx";
import "./styles/notfound.css";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === "Backspace") {
        playMenuConfirmTick();
        navigate("/");
      }
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
      <div className="nf-root">
        <div className="nf-code">404</div>
        <div className="nf-title">LOST IN THE DARK HOUR</div>
        <p className="nf-sub">This page doesn&apos;t exist — or was swallowed by Tartarus.</p>
        <button
          type="button"
          className="nf-btn"
          onClick={() => {
            playMenuConfirmTick();
            navigate("/");
          }}
        >
          RETURN TO MENU →
        </button>
      </div>
    </div>
  );
}
