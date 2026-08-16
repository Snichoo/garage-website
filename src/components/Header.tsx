"use client";

import { SiteHeader } from "./lp/LpHeader";

/**
 * Site-wide entry point for the shared branded header.
 *
 * The paid-traffic landing page uses the same implementation via LpHeader,
 * which keeps the desktop and mobile navigation styles in sync everywhere.
 */
export default function Header() {
  return <SiteHeader />;
}
