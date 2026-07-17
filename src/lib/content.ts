import fs from "fs";
import path from "path";
import { defaultContent, type SiteContent } from "@/content/defaults";

/**
 * Server-side content store. Admin edits are written to
 * content/site-content.json and deep-merged over the defaults, so new fields
 * added to the code keep working even with an older saved file.
 *
 * Server components call getContent() directly; client components receive the
 * merged content via the ContentProvider context set up in the root layout.
 */

const CONTENT_FILE = path.join(process.cwd(), "content", "site-content.json");

let cache: { mtimeMs: number; value: SiteContent } | null = null;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" && value !== null && !Array.isArray(value)
  );
}

/** Arrays are replaced wholesale so items can be added and removed. */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(override)) {
      out[key] =
        key in (base as Record<string, unknown>)
          ? deepMerge((base as Record<string, unknown>)[key], override[key])
          : override[key];
    }
    return out as T;
  }
  return override as T;
}

export function getContent(): SiteContent {
  try {
    const stat = fs.statSync(CONTENT_FILE);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache.value;
    const raw = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
    const merged = deepMerge(defaultContent, raw);
    cache = { mtimeMs: stat.mtimeMs, value: merged };
    return merged;
  } catch {
    return defaultContent;
  }
}

export function saveContent(next: unknown): void {
  if (!isPlainObject(next)) {
    throw new Error("Content must be a JSON object");
  }
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(next, null, 2), "utf8");
  cache = null;
}
