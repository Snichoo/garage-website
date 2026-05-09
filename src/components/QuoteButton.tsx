"use client";

import { openQuoteModal } from "./QuoteModal";

type QuoteButtonProps = {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

export default function QuoteButton({
  className,
  children,
  ariaLabel,
}: QuoteButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openQuoteModal()}
      className={className}
    >
      {children}
    </button>
  );
}
