"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { SITE } from "@/content/site";

const ContactContext = createContext<{ open: () => void }>({ open: () => {} });

export const useContactForm = () => useContext(ContactContext);

type Errors = { name?: string; organisation?: string; email?: string };

const BUDGETS = [
  ["", "Choose a range"],
  ["CHF 15,000–40,000", "CHF 15,000–40,000"],
  ["CHF 40,000–80,000", "CHF 40,000–80,000"],
  ["CHF 80,000–150,000", "CHF 80,000–150,000"],
  ["Over CHF 150,000", "Over CHF 150,000"],
  ["Not known yet", "Not known yet"],
];

export default function ContactFormProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [handedOver, setHandedOver] = useState(false);

  const open = useCallback(() => {
    setErrors({});
    const element = dialog.current;
    if (!element || element.open) return;
    element.showModal();
    document.getElementById("form-name")?.focus();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.animate(
        [
          { transform: "translateX(40px)", opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" }
      );
    }
  }, []);

  const close = () => dialog.current?.close();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const found: Errors = {};
    if (!value("name")) found.name = "Please enter your name.";
    if (!value("organisation")) found.organisation = "Please enter your organisation.";
    if (!value("email")) found.email = "Please enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email")))
      found.email = "Please check the email address.";

    setErrors(found);
    if (Object.keys(found).length) {
      const first = found.name ? "form-name" : found.organisation ? "form-organisation" : "form-email";
      document.getElementById(first)?.focus();
      return;
    }

    // There is no mail service behind the site, so the message is handed to
    // the visitor's own email app, addressed and filled in.
    const body = [
      `Name: ${value("name")}`,
      `Organisation: ${value("organisation")}`,
      `Work email: ${value("email")}`,
      `Budget: ${value("budget") || "Not given"}`,
      "",
      value("message"),
    ].join("\n");
    const subject = `Project enquiry from ${value("organisation")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setHandedOver(true);
  };

  const clearError = (name: keyof Errors) => {
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const context = useMemo(() => ({ open }), [open]);

  return (
    <ContactContext.Provider value={context}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="form-title"
        className="drawer"
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="drawer-body">
          <div className="drawer-head">
            <h2 id="form-title">Discuss a project</h2>
            <button type="button" onClick={close} className="text-button">
              <span>Close</span>
            </button>
          </div>

          {handedOver ? (
            <div role="status" className="drawer-done">
              <p className="drawer-done-title">Your email app should now be open.</p>
              <p className="mute">
                Your message is filled in and addressed to {SITE.founder}. Press send there and it
                reaches a person. If nothing opened, write to{" "}
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>
                .
              </p>
              <button type="button" onClick={() => setHandedOver(false)} className="text-button">
                <span>Write another message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <p className="mute">A named person replies the same business day.</p>
              <Field id="name" label="Your name" autoComplete="name" error={errors.name} onInput={clearError} />
              <Field
                id="organisation"
                label="Organisation"
                autoComplete="organization"
                error={errors.organisation}
                onInput={clearError}
              />
              <Field
                id="email"
                label="Work email"
                type="email"
                dir="ltr"
                autoComplete="email"
                error={errors.email}
                onInput={clearError}
              />
              <div className="field field-select">
                <label htmlFor="form-budget">Budget</label>
                <select id="form-budget" name="budget" defaultValue="">
                  {BUDGETS.map(([value, label]) => (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className="field-arrow">
                  ▼
                </span>
              </div>
              <div className="field">
                <label htmlFor="form-message">What do you need?</label>
                <textarea id="form-message" name="message" rows={4} />
              </div>
              <button type="submit" className="send">
                Send
              </button>
            </form>
          )}
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}

function Field({
  id,
  label,
  type = "text",
  dir,
  autoComplete,
  error,
  onInput,
}: {
  id: keyof Errors;
  label: string;
  type?: string;
  dir?: string;
  autoComplete: string;
  error?: string;
  onInput: (name: keyof Errors) => void;
}) {
  return (
    <div className="field">
      <label htmlFor={`form-${id}`}>{label}</label>
      <input
        id={`form-${id}`}
        name={id}
        type={type}
        dir={dir}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={`form-${id}-error`}
        className={error ? "has-error" : undefined}
        onInput={() => onInput(id)}
      />
      <span id={`form-${id}-error`} className="field-error">
        {error}
      </span>
    </div>
  );
}
