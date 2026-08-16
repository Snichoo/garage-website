"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSiteContent } from "./ContentProvider";

type Status = "idle" | "sending" | "success" | "error";

export default function HeroQuoteForm({ submitLabel }: { submitLabel: string }) {
  const { quoteForm, quoteModal } = useSiteContent();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
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

  // Shown for the moment it takes the /thank-you page to load, and as the
  // fallback if that navigation is ever blocked.
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
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
          {quoteForm.successTitle}
        </h3>
        <p className="text-sm text-neutral-600">
          {quoteForm.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder={quoteForm.namePlaceholder}
          className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy"
        />
        <input
          type="email"
          name="email"
          placeholder={quoteForm.emailPlaceholder}
          className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy"
        />
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          pattern="[0-9 +()\-]{6,}"
          placeholder={quoteForm.phonePlaceholder}
          className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy sm:col-span-2"
        />
        <input
          type="text"
          name="address"
          autoComplete="street-address"
          maxLength={300}
          aria-label="Address (optional)"
          placeholder={quoteForm.addressPlaceholder}
          className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy sm:col-span-2"
        />
      </div>
      <textarea
        name="message"
        placeholder={quoteForm.messagePlaceholder}
        rows={3}
        className="w-full resize-none rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-navy"
      />
      {status === "error" && (
        <p className="-mt-1 text-sm font-semibold text-red-600">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full bg-brand-yellow py-3 font-display text-base font-extrabold text-brand-navy transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
      >
        {status === "sending" ? quoteModal.sendingLabel : submitLabel}
      </button>
    </form>
  );
}
