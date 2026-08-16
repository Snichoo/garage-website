import { StarIcon } from "./icons";
import { cx } from "./swoosh";

export type Testimonial = {
  quote: string;
  name: string;
  initial: string;
  avatarBg: string;
};

/** Notched card shape: the top corners cut in, the bottom stays square. */
const clip = "[clip-path:polygon(9%_0,91%_0,100%_46%,100%_100%,0_100%,0_46%)]";

function Stars() {
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-6 w-6 text-brand-yellow" />
      ))}
    </div>
  );
}

/**
 * A single Google review, floated between two sections so it overlaps the seam.
 * `backgroundClassName` has to match the section underneath, because the lower
 * half of the strip paints that colour behind the card.
 */
export function TestimonialStrip({
  testimonial,
  className,
  backgroundClassName = "bg-white",
  tone = "light",
}: {
  testimonial: Testimonial;
  className?: string;
  backgroundClassName?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className={cx("relative z-20 flow-root w-full overflow-visible", className)}>
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 top-1/2",
          backgroundClassName,
        )}
      />
      <div className="-my-6 mx-auto w-full max-w-[1440px] px-6">
        <div className="relative isolate overflow-visible">
          <div
            aria-hidden
            className={cx(
              "pointer-events-none absolute inset-0 -z-10 translate-y-3 scale-[1.004] blur-sm",
              clip,
              dark ? "bg-black/25" : "bg-black/10",
            )}
          />
          <div
            className={cx(
              "relative z-10 px-8 pb-6 pt-10 text-center sm:px-24",
              clip,
              dark
                ? "bg-brand-ink [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.22))_drop-shadow(0_10px_18px_rgba(0,0,0,0.22))]"
                : "bg-white [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.07))_drop-shadow(0_10px_18px_rgba(0,0,0,0.09))]",
            )}
          >
            <Stars />
            <p
              className={cx(
                "mx-auto mt-6 max-w-[1080px] text-[17px] font-medium leading-[28px] sm:text-[20px] sm:leading-[30px]",
                dark ? "text-white" : "text-brand-ink",
              )}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[17px] font-extrabold text-white"
                style={{ backgroundColor: testimonial.avatarBg }}
              >
                {testimonial.initial}
              </span>
              <span
                className={cx(
                  "text-[18px] font-medium",
                  dark ? "text-white" : "text-brand-ink",
                )}
              >
                {testimonial.name}
                <span className={cx("ml-2 text-[15px]", dark ? "text-white/60" : "text-brand-body")}>
                  · Google review
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
