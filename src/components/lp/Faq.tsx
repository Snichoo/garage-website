"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";
import { Swoosh, cx } from "./swoosh";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-[19px] font-extrabold text-brand-ink sm:text-[22px]">
          {q}
        </span>
        <ChevronIcon
          className={cx(
            "h-5 w-5 shrink-0 text-brand-navy transition-transform duration-300",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <div className={cx("grid transition-all duration-300", open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p className="text-[15px] leading-relaxed text-brand-body">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <section id="faq" className="bg-white pb-32 pt-16 scroll-mt-28">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <h2 className="mx-auto max-w-5xl text-center font-display text-[40px] font-extrabold leading-[1.04] text-brand-ink sm:text-[56px] lg:text-[74px]">
          Common Questions,{" "}
          <Swoosh color="#15355E">Straight Answers</Swoosh>
        </h2>

        <div className="mt-16 grid gap-x-16 md:grid-cols-2">
          <div>
            {left.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
          <div>
            {right.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
