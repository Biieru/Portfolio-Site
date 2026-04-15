import * as Framer from "framer-motion";
import { useLocation } from "react-router-dom";

const defaultBlocks = ["#0d1a3a", "#1a6aff", "#7dd4fc"];

function DefaultTransition() {
  return defaultBlocks.map((color, i) => (
    <Framer.motion.div
      key={i}
      style={{
        position: "fixed",
        inset: 0,
        background: color,
        zIndex: 999 - i,
        originX: 0,
        pointerEvents: "none",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 1, 0] }}
      transition={{
        duration: 0.45,
        delay: i * 0.05,
        times: [0, 0.4, 0.6, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function AboutTransition() {
  const panels = [
    { color: "#00184c", top: "-12vh", left: "-18vw", width: "86vw", delay: 0 },
    { color: "#53edff", top: "24vh", left: "-10vw", width: "72vw", delay: 0.05 },
    { color: "#ffffff", top: "58vh", left: "-14vw", width: "82vw", delay: 0.1 },
  ];

  return panels.map((panel, i) => (
    <Framer.motion.div
      key={i}
      style={{
        position: "fixed",
        top: panel.top,
        left: panel.left,
        width: panel.width,
        height: "26vh",
        background: panel.color,
        zIndex: 999 - i,
        clipPath: "polygon(0 0, 100% 0, calc(100% - 120px) 100%, 0 100%)",
        transform: "rotate(-18deg)",
        transformOrigin: "left center",
        pointerEvents: "none",
      }}
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: [-500, 20, 0], opacity: [1, 1, 0] }}
      transition={{
        duration: 0.52,
        delay: panel.delay,
        times: [0, 0.68, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  ));
}

function SocialsTransition() {
  const stripes = [
    { color: "#00184c", left: "72vw", width: "24vw", delay: 0 },
    { color: "#00dff7", left: "80vw", width: "14vw", delay: 0.06 },
    { color: "#ffffff", left: "88vw", width: "8vw", delay: 0.12 },
  ];

  return stripes.map((stripe, i) => (
    <Framer.motion.div
      key={i}
      style={{
        position: "fixed",
        top: "-6vh",
        left: stripe.left,
        width: stripe.width,
        height: "112vh",
        background: stripe.color,
        zIndex: 999 - i,
        transform: "skewX(-16deg)",
        transformOrigin: "top",
        pointerEvents: "none",
      }}
      initial={{ y: -1200, opacity: 1 }}
      animate={{ y: [-1200, 0, 0, "140vh"], opacity: [1, 1, 1, 0] }}
      transition={{
        duration: 0.56,
        delay: stripe.delay,
        times: [0, 0.42, 0.58, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function ResumeTransition() {
  const cards = [
    { top: "14vh", color: "#0f1760", delay: 0 },
    { top: "31vh", color: "#7ff6ff", delay: 0.05 },
    { top: "48vh", color: "#ffffff", delay: 0.1 },
    { top: "65vh", color: "#0f1760", delay: 0.15 },
  ];

  return cards.map((card, i) => (
    <Framer.motion.div
      key={i}
      style={{
        position: "fixed",
        left: "-6vw",
        top: card.top,
        width: "78vw",
        height: "14vh",
        background: card.color,
        zIndex: 999 - i,
        clipPath: "polygon(0 0, 97% 0, 100% 100%, 3% 100%)",
        boxShadow: card.color === "#ffffff" ? "10px 0 0 #d63232" : "none",
        pointerEvents: "none",
      }}
      initial={{ x: "-110vw", opacity: 1 }}
      animate={{
        x: ["-110vw", "2vw", "0vw", "125vw"],
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        duration: 0.72,
        delay: card.delay,
        times: [0, 0.42, 0.58, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function ProjectsTransition() {
  const blocks = ["#0a1538", "#1a6aff", "#e8f8ff"];
  return blocks.map((color, i) => (
    <Framer.motion.div
      key={i}
      style={{
        position: "fixed",
        inset: 0,
        background: color,
        zIndex: 999 - i,
        originY: 1,
        pointerEvents: "none",
      }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: [0, 1, 1, 0] }}
      transition={{
        duration: 0.48,
        delay: i * 0.06,
        times: [0, 0.35, 0.65, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function TransitionOverlay({ variant }) {
  if (variant === "about") return <AboutTransition />;
  if (variant === "resume") return <ResumeTransition />;
  if (variant === "socials") return <SocialsTransition />;
  if (variant === "projects") return <ProjectsTransition />;
  return <DefaultTransition />;
}

export default function PageTransition({ children, variant = "default" }) {
  const location = useLocation();

  return (
    <Framer.AnimatePresence mode="wait">
      <Framer.motion.div key={location.pathname} style={{ position: "relative" }}>
        <TransitionOverlay variant={variant} />
        <Framer.motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.18 }}
        >
          {children}
        </Framer.motion.div>
      </Framer.motion.div>
    </Framer.AnimatePresence>
  );
}
