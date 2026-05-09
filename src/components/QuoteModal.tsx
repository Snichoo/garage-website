"use client";

import { useEffect, useState } from "react";

const OPEN_EVENT = "sparrow:open-quote";
const SESSION_KEY = "sparrow_quote_auto_seen";
const AUTO_OPEN_DELAY_MS = 25_000;

export function openQuoteModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function QuoteModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = window.setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <button
        type="button"
        aria-label="Close quote form"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="bg-brand-navy px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                Free Measure &amp; Quote
              </p>
              <h2
                id="quote-modal-title"
                className="mt-1 font-display text-2xl font-extrabold leading-tight md:text-3xl"
              >
                Get your free quote
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-1 rounded-full p-1.5 text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-4 p-6 text-brand-black md:p-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Name"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
            />
            <input
              type="tel"
              required
              placeholder="Phone"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
            />
          </div>
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
          <textarea
            placeholder="Tell us about your job (optional)"
            rows={4}
            className="w-full resize-none rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
          <button
            type="submit"
            className="mt-1 w-full bg-brand-yellow py-3.5 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 md:text-lg"
          >
            Request my free quote
          </button>
          <p className="text-center text-xs text-neutral-500">
            Or call us direct on{" "}
            <a
              href="tel:0468789795"
              className="font-bold text-brand-navy underline"
            >
              0468 789 795
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
