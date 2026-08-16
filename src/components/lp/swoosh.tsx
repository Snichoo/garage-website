import type { CSSProperties, ReactNode } from "react";

/** Join class names, dropping anything falsy. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Wraps a run of heading text with the angled highlight stroke used across the
 * landing page. `color` sets the stroke colour: brand yellow reads best on the
 * dark sections, navy on the white ones.
 */
export function Swoosh({
  children,
  color = "#FDD710",
  className,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cx("lp-swoosh", className)}
      style={{ "--lp-swoosh-color": color } as CSSProperties}
    >
      {children}
    </span>
  );
}
