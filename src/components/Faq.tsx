"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "What factors should I consider when choosing a garage door?",
    a: "When selecting a garage door, consider factors such as your budget, the available space, insulation needs, security features, and the style of your home. Each type of door offers unique benefits tailored to different preferences and requirements.",
  },
  {
    q: "How do I maintain my garage door?",
    a: "Regular maintenance includes cleaning the surface, lubricating moving parts, checking the balance, and inspecting the door and opener for wear and tear. Professional servicing is recommended annually to ensure optimal performance and safety.",
  },
  {
    q: "Are garage doors insulated?",
    a: "Yes, many garage doors, especially sectional and roller types, are available with insulation options. Insulated doors help regulate indoor temperatures, reduce energy costs, and minimize noise.",
  },
  {
    q: "Can I customize the design of my garage door?",
    a: "Absolutely! At Sparrow Garage Doors, we offer a range of customizable options, including materials, colors, finishes, and additional features such as windows or decorative hardware.",
  },
  {
    q: "How long does it take to install a garage door?",
    a: "The installation time depends on the type of door and the complexity of the project. On average, professional installation can take anywhere from a few hours to a full day.",
  },
  {
    q: "What safety features do modern garage doors have?",
    a: "Modern garage doors come with advanced safety features, such as auto-reverse mechanisms, motion sensors, and manual release options, ensuring secure and reliable operation.",
  },
];

const defaultIntro =
  "Answers to the questions we hear most often about choosing, installing, and looking after your garage door.";

type FaqProps = {
  items?: FaqItem[];
  intro?: string;
};

export default function Faq({ items, intro }: FaqProps = {}) {
  const faqs = items ?? defaultFaqs;
  const blurb = intro ?? defaultIntro;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Stencil heading */}
        <div className="relative mb-10 h-[60px] md:mb-12 md:h-[120px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[48px] font-extrabold leading-none tracking-tight md:text-[96px]">
            FAQ
          </h2>
          <h2 className="absolute bottom-0 left-3 font-display text-[42px] font-extrabold leading-none tracking-tight text-brand-navy md:left-6 md:text-[84px]">
            FAQ
          </h2>
        </div>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-700 md:mb-10 md:text-lg">
          {blurb}
        </p>

        <ul className="flex flex-col gap-3 md:gap-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-5"
                >
                  <span className="font-display text-lg font-extrabold text-brand-navy md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-yellow transition-transform duration-200 md:h-8 md:w-8 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 md:h-4 md:w-4"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-base leading-relaxed text-neutral-700 md:px-7 md:pb-6 md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
