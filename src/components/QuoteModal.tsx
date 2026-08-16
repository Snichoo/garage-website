"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSiteContent } from "./ContentProvider";

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
  const { quoteModal, quoteForm, business } = useSiteContent();
  const router = useRouter();
  const pathname = usePathname();
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

  // The modal lives in the root layout, so it survives route changes. Close it
  // once a navigation lands: after a send that is the /thank-you page arriving,
  // which keeps the success state on screen until the page is actually there.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      address: String(fd.get("address") || ""),
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
      router.push("/thank-you");
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

      <div className="relative flex max-h-[calc(100dvh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="bg-brand-navy px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                {quoteModal.kicker}
              </p>
              <h2
                id="quote-modal-title"
                className="mt-1 font-display text-2xl font-extrabold leading-tight md:text-3xl"
              >
                {quoteModal.title}
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
              {quoteModal.successTitle}
            </h3>
            <p className="text-sm text-neutral-600">
              {quoteModal.successText}
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
          className="min-h-0 overflow-y-auto overscroll-contain p-6 text-brand-black md:p-7"
        >
          <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder={quoteForm.namePlaceholder}
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
            />
            <input
              type="tel"
              name="phone"
              inputMode="tel"
              pattern="[0-9 +()\-]{6,}"
              placeholder={quoteForm.phonePlaceholder}
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder={quoteForm.emailPlaceholder}
            className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
          <input
            type="text"
            name="address"
            autoComplete="street-address"
            maxLength={300}
            aria-label="Address (optional)"
            placeholder={quoteForm.addressPlaceholder}
            className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
          <textarea
            name="message"
            placeholder={quoteModal.messagePlaceholder}
            rows={4}
            className="w-full resize-none rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
          />
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
            {status === "sending" ? quoteModal.sendingLabel : quoteModal.submitLabel}
          </button>
          <p className="text-center text-xs text-neutral-500">
            {quoteModal.callPrompt}{" "}
            <a
              href={`tel:${business.phoneLink}`}
              className="font-bold text-brand-navy underline"
            >
              {business.phoneDisplay}
            </a>
          </p>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
