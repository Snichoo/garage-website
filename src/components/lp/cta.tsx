import QuoteButton from "@/components/QuoteButton";
import { ArrowDoodle, PhoneIcon, TickMark } from "./icons";
import { cx } from "./swoosh";

export type Phone = { display: string; link: string };

/** Primary conversion button: opens the site-wide quote modal. */
export function LpQuoteButton({
  className,
  label = "Get My Free On-Site Quote",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <QuoteButton
      className={cx(
        "flex w-full items-center justify-center gap-3 bg-brand-yellow px-6 py-4 font-display text-[18px] font-extrabold tracking-wide text-brand-navy transition-colors hover:bg-brand-yellowDark sm:px-8 sm:text-[22px]",
        className,
      )}
    >
      {label}
    </QuoteButton>
  );
}

/** Secondary call button, stacked under the quote button. */
export function LpCallButton({
  phone,
  className,
}: {
  phone: Phone;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phone.link}`}
      className={cx(
        "flex w-full items-center justify-center gap-2 bg-brand-navyDeep px-8 py-4 text-lg font-semibold tracking-wide text-white transition-colors hover:bg-black",
        className,
      )}
    >
      <span>Or Call</span>
      <PhoneIcon className="h-5 w-5 text-brand-yellow" />
      <span className="font-display text-[22px] font-extrabold">{phone.display}</span>
    </a>
  );
}

/**
 * Centred CTA for the light sections: yellow button with the hand-drawn arrow
 * and a single tick line underneath.
 */
export function SectionCta({
  subtext,
  arrow = "left",
  label,
  className,
}: {
  subtext?: string;
  arrow?: "left" | "right";
  label?: string;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto max-w-[480px]", className)}>
      <div className="relative">
        {arrow === "left" && (
          <ArrowDoodle className="pointer-events-none absolute -left-16 -top-6 hidden h-16 w-14 -scale-x-100 text-brand-ink sm:block" />
        )}
        <LpQuoteButton label={label} />
        {arrow === "right" && (
          <ArrowDoodle className="pointer-events-none absolute -right-16 top-2 hidden h-16 w-14 text-brand-ink sm:block" />
        )}
      </div>
      {subtext && (
        <p className="mt-3 flex items-center justify-center gap-2 text-center text-[15px] font-medium text-brand-body">
          <TickMark className="h-5 w-5 shrink-0 text-brand-navy" />
          {subtext}
        </p>
      )}
    </div>
  );
}

/** Hero button stack: quote, call, and the two reassurance ticks. */
export function CtaStack({ phone }: { phone: Phone }) {
  return (
    <div className="w-full max-w-[480px]">
      <div className="relative">
        {/* `!` so the hero size wins over the button's own sm: size. */}
        <LpQuoteButton className="border-4 border-white sm:!text-[26px]" />
        <ArrowDoodle className="pointer-events-none absolute -right-14 top-2 hidden h-16 w-14 text-white sm:block" />
      </div>
      <LpCallButton phone={phone} className="mt-3" />
      <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center text-[15px] font-medium text-white sm:flex-row sm:flex-wrap sm:gap-x-8">
        <span className="flex items-center justify-center gap-2">
          <TickMark className="h-5 w-5 shrink-0 text-brand-yellow" />
          Talk to a real gate technician.
        </span>
        <span className="flex items-center justify-center gap-2">
          <TickMark className="h-5 w-5 shrink-0 text-brand-yellow" />
          Free on-site measure. No obligation.
        </span>
      </div>
    </div>
  );
}
