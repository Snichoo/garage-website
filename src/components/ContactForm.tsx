"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSiteContent } from "./ContentProvider";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const { contactForm, quoteModal } = useSiteContent();
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
      formType: "contact",
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
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
      <div className="mt-8 flex flex-col items-center gap-3 border border-green-200 bg-green-50 p-8 text-center">
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
          {contactForm.successTitle}
        </h3>
        <p className="text-sm text-neutral-600">
          {contactForm.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          type="text"
          name="firstName"
          placeholder={contactForm.firstNamePlaceholder}
          className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
        />
        <input
          type="text"
          name="lastName"
          placeholder={contactForm.lastNamePlaceholder}
          className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          type="email"
          name="email"
          placeholder={contactForm.emailPlaceholder}
          className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
        />
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          pattern="[0-9 +()\-]{6,}"
          placeholder={contactForm.phonePlaceholder}
          className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
        />
      </div>

      <textarea
        name="message"
        placeholder={contactForm.messagePlaceholder}
        rows={6}
        className="w-full resize-none border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
      />

      {status === "error" && (
        <p className="-mt-2 text-sm font-semibold text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex w-full items-center justify-center bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-lg"
      >
        {status === "sending" ? quoteModal.sendingLabel : contactForm.submitLabel}
      </button>
    </form>
  );
}
