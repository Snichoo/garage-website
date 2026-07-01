"use client";

import { useEffect, useState } from "react";

const OPEN_EVENT = "sparrow:open-quote";

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

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setErrorMsg("");
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      formType: "quote",
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

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

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center text-brand-black">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-extrabold text-brand-navy">
              Thanks, we&apos;ve got it!
            </h3>
            <p className="text-sm text-neutral-600">
              We&apos;ll be in touch shortly to arrange your free measure and quote.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 bg-brand-yellow px-6 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 text-brand-black md:p-7"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              required
              placeholder="Name *"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
            />
            <input
              type="tel"
              name="phone"
              required
              inputMode="tel"
              pattern="[0-9 +()\-]{6,}"
              placeholder="Phone *"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
            />
          </div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email *"
            className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
          <textarea
            name="message"
            required
            minLength={10}
            placeholder="Tell us about your job *"
            rows={4}
            className="w-full resize-none rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
          <p className="-mt-1 text-xs text-neutral-500">
            All fields are required.
          </p>
          {status === "error" && (
            <p className="-mt-1 text-sm font-semibold text-red-600">
              {errorMsg}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full bg-brand-yellow py-3.5 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
          >
            {status === "sending" ? "Sending..." : "Request my free quote"}
          </button>
          <p className="text-center text-xs text-neutral-500">
            Or call us direct on{" "}
            <a
              href="tel:0731803857"
              className="font-bold text-brand-navy underline"
            >
              07 3180 3857
            </a>
          </p>
        </form>
        )}
      </div>
    </div>
  );
}
