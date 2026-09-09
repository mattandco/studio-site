"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./motion/MotionProvider";
import { WORK } from "@/content/work";

export default function WorkRegister() {
  const { reduceMotion, strike } = useMotion();
  const [active, setActive] = useState(0);
  const [panelTitle, setPanelTitle] = useState("");
  const [panelTyping, setPanelTyping] = useState(false);
  const [panelBody, setPanelBody] = useState(false);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const typePanel = (index: number, immediate = false) => {
    const item = WORK[index];
    if (!item) return;
    clearTimers();
    setActive(index);

    if (reduceMotion) {
      setPanelTitle(item.title);
      setPanelTyping(false);
      setPanelBody(true);
      return;
    }

    setPanelTitle("");
    setPanelTyping(true);
    setPanelBody(false);
    let i = 0;
    const step = () => {
      i += 1;
      const ch = item.title[i - 1];
      setPanelTitle(item.title.slice(0, i));
      strike(ch === " " ? "space" : "key");
      if (i >= item.title.length) {
        timersRef.current.push(
          window.setTimeout(() => {
            setPanelTyping(false);
            setPanelBody(true);
          }, 180)
        );
        return;
      }
      timersRef.current.push(window.setTimeout(step, 15 + Math.random() * 13));
    };
    timersRef.current.push(window.setTimeout(step, immediate ? 0 : 90));
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    typePanel(0, true);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activate = (index: number) => {
    if (active !== index) typePanel(index);
  };

  const activeItem = WORK[active] || WORK[0];

  return (
    <section
      id="work"
      style={{
        scrollMarginTop: "58px",
        padding: "clamp(40px,5vw,72px) 0 clamp(24px,3vw,44px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(20px,4vw,56px)",
          alignItems: "baseline",
          marginBottom: "clamp(30px,4vw,56px)",
        }}
      >
        <h2
          data-type=""
          data-type-speed="16"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(30px,4.4vw,60px)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            margin: 0,
            flex: "1 1 340px",
            minWidth: 0,
            maxWidth: "14ch",
          }}
        >
          Work from the studio
        </h2>
        <p
          data-sweep=""
          data-sweep-delay="420"
          style={{
            flex: "1 1 300px",
            minWidth: 0,
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--ink-muted)",
            margin: 0,
            maxWidth: "42ch",
          }}
        >
          A register of engagements. Move through it — each entry types
          itself out.
        </p>
      </div>

      {/* Featured current engagement */}
      <article style={{ marginBottom: "clamp(44px,5.5vw,84px)" }}>
        <div
          data-rule=""
          style={{
            height: "1px",
            background: "var(--ink)",
            marginBottom: "clamp(22px,2.6vw,34px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 28px",
            alignItems: "baseline",
            marginBottom: "clamp(18px,2.4vw,30px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px", flex: "0 0 auto" }}>
            <span
              data-pulse=""
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span
              data-type=""
              data-type-speed="13"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Currently in the studio
            </span>
          </div>
          <span
            data-type=""
            data-type-speed="16"
            data-type-delay="360"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11.5px",
              color: "var(--meta)",
            }}
          >
            Global Girls Foundation
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(20px,3.5vw,56px)",
            alignItems: "flex-end",
          }}
        >
          <h3
            data-type=""
            data-type-speed="18"
            data-type-delay="600"
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(26px,3.4vw,46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "24ch",
            }}
          >
            A digital home for the Global Girls Foundation
          </h3>
          <p
            data-sweep=""
            data-sweep-delay="1400"
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              margin: 0,
              maxWidth: "44ch",
            }}
          >
            In progress with the whole studio team: a public platform for the
            Foundation&rsquo;s programmes, built to be maintained by their own
            people afterwards.
          </p>
        </div>
      </article>

      {/* The register */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(24px,3vw,72px)",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <div data-rule="" style={{ height: "1px", background: "var(--ink)", marginBottom: "6px" }} />
          {WORK.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.num}
                type="button"
                onMouseEnter={() => activate(i)}
                onClick={() => activate(i)}
                onFocus={() => activate(i)}
                className="mb-register-row"
                aria-current={isActive}
                style={{
                  display: "flex",
                  width: "100%",
                  cursor: "pointer",
                  borderBottom: "1px solid var(--rule-list)",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  background: "none",
                  padding: "clamp(14px,1.8vw,20px) 0",
                  gap: "16px",
                  alignItems: "baseline",
                  textAlign: "left",
                  font: "inherit",
                  color: "inherit",
                  appearance: "none",
                }}
              >
                <span
                  style={{
                    flex: "0 0 auto",
                    width: "26px",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11px",
                    color: "var(--meta)",
                    lineHeight: 1.9,
                  }}
                >
                  {item.num}
                </span>
                <span
                  className="mb-register-name"
                  style={{
                    flex: "1 1 auto",
                    minWidth: 0,
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(20px,2.1vw,28px)",
                    lineHeight: 1.22,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.name}
                </span>
                {isActive && (
                  <span
                    style={{
                      flex: "0 0 auto",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "12px",
                      color: "var(--accent)",
                      lineHeight: 2,
                      animation: reduceMotion
                        ? undefined
                        : "mbSweep 640ms cubic-bezier(0.22,1,0.36,1) both",
                    }}
                  >
                    —
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          style={{
            flex: "1 1 390px",
            minWidth: 0,
            position: "sticky",
            top: "72px",
            minHeight: "340px",
          }}
        >
          <div
            data-rule=""
            style={{
              height: "1px",
              background: "var(--ink)",
              marginBottom: "clamp(20px,2.4vw,30px)",
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--meta)",
              marginBottom: "clamp(18px,2.2vw,26px)",
            }}
          >
            {activeItem.num} / 06
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "14px",
              lineHeight: 1.55,
              minHeight: "2.6em",
            }}
          >
            {activeItem.client}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(24px,2.8vw,38px)",
              lineHeight: 1.14,
              letterSpacing: "-0.018em",
              margin: "0 0 clamp(16px,2vw,22px)",
              maxWidth: "22ch",
              minHeight: "2.3em",
            }}
          >
            <span aria-hidden={panelTyping || undefined}>{panelTitle}</span>
            {panelTyping && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "0.06em",
                  height: "0.72em",
                  background: "var(--accent)",
                  marginLeft: "0.07em",
                  animation: "mbCaret 1.15s steps(1,end) infinite",
                }}
              />
            )}
          </h3>
          {panelBody && (
            <div
              style={{
                animation: reduceMotion
                  ? undefined
                  : "mbSweep 1000ms cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.72,
                  color: "var(--ink-muted)",
                  margin: "0 0 18px",
                  maxWidth: "50ch",
                }}
              >
                {activeItem.note}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 18px",
                  alignItems: "baseline",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11.5px",
                  color: "var(--meta)",
                }}
              >
                <span>{activeItem.scope}</span>
                {activeItem.link && (
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-panel-link"
                    style={{
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--border-soft)",
                      paddingBottom: "1px",
                    }}
                  >
                    {activeItem.linkLabel} ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
