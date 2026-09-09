"use client";

import { useMotion } from "./motion/MotionProvider";

function SoundToggle() {
  const { soundOn, toggleSound } = useMotion();
  return (
    <div
      onClick={toggleSound}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSound();
        }
      }}
      title="Typewriter sound"
      aria-pressed={soundOn}
      className="mb-sound-toggle"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        cursor: "pointer",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "10.5px",
        letterSpacing: "0.06em",
        textTransform: "none",
        paddingBottom: "3px",
      }}
    >
      <span
        className="mb-sound-dot"
        style={{
          width: "6px",
          height: "6px",
          border: "1px solid var(--accent)",
          display: "inline-block",
        }}
      />
      <span>{soundOn ? "sound on" : "sound"}</span>
    </div>
  );
}

export default function Masthead() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "var(--paper)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "14px clamp(20px,5vw,72px)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            flexWrap: "wrap",
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Matthew Bowman
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              color: "var(--meta)",
            }}
          >
            Studio
          </span>
        </a>
        <div
          style={{
            display: "flex",
            gap: "clamp(14px,2.2vw,30px)",
            alignItems: "baseline",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
          }}
        >
          <a href="#studio" className="mb-nav-link">
            Studio
          </a>
          <a href="#capabilities" className="mb-nav-link">
            Capabilities
          </a>
          <a href="#work" className="mb-nav-link">
            Work
          </a>
          <a
            href="mailto:matthew.bowman.consult@gmail.com"
            style={{
              color: "var(--ink)",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: "3px",
            }}
          >
            Contact
          </a>
          <SoundToggle />
        </div>
      </div>
    </div>
  );
}
