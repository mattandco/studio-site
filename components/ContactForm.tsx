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
import { localePath, type Lang } from "@/lib/languages";

const ContactContext = createContext<{ open: () => void; href: string }>({
  open: () => {},
  href: "/#contact",
});

export const useContactForm = () => useContext(ContactContext);

type Errors = { name?: string; organisation?: string; email?: string; message?: string };

type FormText = {
  title: string;
  close: string;
  doneTitle: string;
  doneText: string;
  writeAnother: string;
  statement: string;
  name: string;
  organisation: string;
  email: string;
  message: string;
  messageHelp: string;
  budget: string;
  budgetHelp: string;
  budgetNotDecided: string;
  budgetUnder: string;
  budgetA: string;
  budgetB: string;
  budgetC: string;
  budgetOver: string;
  link: string;
  linkHelp: string;
  privacy: string;
  send: string;
  errorName: string;
  errorOrganisation: string;
  errorEmail: string;
  errorEmailFormat: string;
  errorMessage: string;
};

export default function ContactFormProvider({
  lang,
  text,
  children,
}: {
  lang: Lang;
  text: FormText;
  children: ReactNode;
}) {
  // Values stay in English: they go into the email Nestvested receives.
  const budgets = [
    ["Not decided yet", text.budgetNotDecided],
    ["Under CHF 10,000", text.budgetUnder],
    ["CHF 10,000 to 35,000", text.budgetA],
    ["CHF 35,000 to 60,000", text.budgetB],
    ["CHF 60,000 to 100,000", text.budgetC],
    ["Over CHF 100,000", text.budgetOver],
  ];
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
      element.querySelectorAll(".form > *").forEach((node, index) => {
        node.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 700, delay: 120 + index * 45, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }
        );
      });
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.animate(
        [
          { transform: `translateX(${document.dir === "rtl" ? -40 : 40}px)`, opacity: 0 },
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
    if (!value("name")) found.name = text.errorName;
    if (!value("organisation")) found.organisation = text.errorOrganisation;
    if (!value("email")) found.email = text.errorEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email")))
      found.email = text.errorEmailFormat;
    if (!value("message")) found.message = text.errorMessage;

    setErrors(found);
    if (Object.keys(found).length) {
      const first = found.name
        ? "form-name"
        : found.organisation
          ? "form-organisation"
          : found.email
            ? "form-email"
            : "form-message";
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
      `Brief or TOR: ${value("link") || "Not given"}`,
      `Site language: ${lang}`,
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

  const context = useMemo(() => ({ open, href: localePath(lang, "/#contact") }), [open, lang]);
  const [doneStart, doneMiddle = "", doneEnd = ""] = text.doneText.split(/\{name\}|\{email\}/);
  const nameFirst = text.doneText.indexOf("{name}") < text.doneText.indexOf("{email}");
  const [linkBefore, linkAfter = ""] = text.linkHelp.split("{email}");
  const mail = (
    <a href={`mailto:${SITE.email}`} dir="ltr" className="link">
      {SITE.email}
    </a>
  );

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
            <h2 id="form-title">{text.title}</h2>
            <button type="button" onClick={close} className="text-button">
              <span>{text.close}</span>
            </button>
          </div>

          {handedOver ? (
            <div role="status" className="drawer-done">
              <p className="drawer-done-title">{text.doneTitle}</p>
              <p className="mute">
                {doneStart}
                {nameFirst ? SITE.founder : mail}
                {doneMiddle}
                {nameFirst ? mail : SITE.founder}
                {doneEnd}
              </p>
              <button type="button" onClick={() => setHandedOver(false)} className="text-button">
                <span>{text.writeAnother}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <p className="mute">{text.statement}</p>
              <Field id="name" label={text.name} autoComplete="name" error={errors.name} onInput={clearError} />
              <Field
                id="organisation"
                label={text.organisation}
                autoComplete="organization"
                error={errors.organisation}
                onInput={clearError}
              />
              <Field
                id="email"
                label={text.email}
                type="email"
                dir="ltr"
                autoComplete="email"
                error={errors.email}
                onInput={clearError}
              />
              <div className="field">
                <label htmlFor="form-message">{text.message}</label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={4}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby="form-message-help form-message-error"
                  className={errors.message ? "has-error" : undefined}
                  onInput={() => clearError("message")}
                />
                <span id="form-message-help" className="field-help">
                  {text.messageHelp}
                </span>
                <span id="form-message-error" className="field-error">
                  {errors.message}
                </span>
              </div>
              <div className="field field-select">
                <label htmlFor="form-budget">{text.budget}</label>
                <div className="select-box">
                <select id="form-budget" name="budget" defaultValue="Not decided yet" aria-describedby="form-budget-help">
                  {budgets.map(([value, label]) => (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className="field-arrow">
                  ▼
                </span>
                </div>
                <span id="form-budget-help" className="field-help">
                  {text.budgetHelp}
                </span>
              </div>
              <div className="field">
                <label htmlFor="form-link">{text.link}</label>
                <input id="form-link" name="link" type="url" dir="ltr" aria-describedby="form-link-help" />
                <span id="form-link-help" className="field-help">
                  {linkBefore}
                  <span dir="ltr">{SITE.email}</span>
                  {linkAfter}
                </span>
              </div>
              <p className="mute form-privacy">{text.privacy}</p>
              <button type="submit" className="send">
                {text.send}
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
