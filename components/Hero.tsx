"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./motion/MotionProvider";

const HERO_TEXT = "Bridging Gaps with Inclusive Technological Solutions";

export default function Hero() {
  const { reduceMotion, strike, bell, soundEnabledTick } = useMotion();
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(true);
  const runningRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);
  const lastSoundTick = useRef(soundEnabledTick);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const runHero = (lead: number) => {
    if (runningRef.current) return;
    runningRef.current = true;
    clearTimers();
    setTyped("");
    setTyping(true);
    let i = 0;
    const step = () => {
      i += 1;
      const ch = HERO_TEXT[i - 1];
      setTyped(HERO_TEXT.slice(0, i));
      strike(ch === " " ? "space" : "key");
      if (i >= HERO_TEXT.length) {
        bell();
        runningRef.current = false;
        timersRef.current.push(window.setTimeout(() => setTyping(false), 2400));
        return;
      }
      let d = 24 + Math.random() * 18;
      if (ch === " ") d += 26;
      timersRef.current.push(window.setTimeout(step, d));
    };
    timersRef.current.push(window.setTimeout(step, lead));
  };

  // Start the typewriter once fonts are ready. Not on DOM ready.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = () => {
      if (reduceMotion) {
        setTyped(HERO_TEXT);
        setTyping(false);
        return;
      }
      runHero(560);
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // Retype with keystrokes when sound is switched on.
  useEffect(() => {
    if (lastSoundTick.current === soundEnabledTick) return;
    lastSoundTick.current = soundEnabledTick;
    if (reduceMotion) return;
    runningRef.current = false;
    timersRef.current.push(window.setTimeout(() => runHero(180), 120));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundEnabledTick, reduceMotion]);

  return (
    <div
      id="top"
      style={{
        maxWidth: "1240px",
        margin: "0 auto",
        padding: "0 clamp(20px,5vw,72px)",
      }}
    >
      <header
        style={{
          padding: "clamp(60px,10vw,150px) 0 clamp(40px,6vw,80px)",
        }}
      >
        <div
          data-type=""
          data-type-speed="12"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--meta)",
            marginBottom: "clamp(30px,4.5vw,54px)",
          }}
        >
          A small studio for humanitarian information · Working with the sector
          since 2010
        </div>
        <h1
          aria-label={HERO_TEXT}
          style={{
            position: "relative",
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(40px,8.6vw,124px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            margin: 0,
            maxWidth: "17ch",
          }}
        >
          <span aria-hidden="true" style={{ visibility: "hidden" }}>
            {HERO_TEXT}
          </span>
          <span
            aria-hidden="true"
            style={{ position: "absolute", left: 0, top: 0, right: 0 }}
          >
            {typed}
            {typing && (
              <span
                style={{
                  display: "inline-block",
                  width: "0.055em",
                  height: "0.74em",
                  background: "var(--accent)",
                  marginLeft: "0.07em",
                  verticalAlign: "baseline",
                  animation: "mbCaret 1.15s steps(1,end) infinite",
                }}
              />
            )}
          </span>
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(24px,4vw,64px)",
            alignItems: "flex-end",
            marginTop: "clamp(38px,5.5vw,78px)",
          }}
        >
          <p
            data-sweep=""
            data-sweep-delay="900"
            style={{
              flex: "1 1 480px",
              minWidth: 0,
              fontSize: "clamp(18px,1.7vw,24px)",
              lineHeight: 1.56,
              margin: 0,
              maxWidth: "46ch",
            }}
          >
            We build the data systems, platforms, and information services
            that humanitarian organisations rely on when a decision cannot
            wait.
          </p>
          <div
            data-sweep=""
            data-sweep-delay="1150"
            style={{
              flex: "0 1 260px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <a
              href="mailto:matthew.bowman.consult@gmail.com"
              className="mb-cta-button"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "var(--ink)",
                color: "var(--paper)",
                padding: "15px 22px",
                borderRadius: "2px",
                textAlign: "center",
              }}
            >
              Start a conversation
            </a>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11.5px",
                color: "var(--meta)",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              Remote studio · Engagements worldwide
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
