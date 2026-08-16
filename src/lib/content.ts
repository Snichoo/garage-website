import fs from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import { defaultContent, type SiteContent } from "@/content/defaults";

/**
 * Server-side content store. Admin edits are deep-merged over the defaults in
 * src/content/defaults.ts, so new fields added to the code keep working even
 * with an older saved file.
 *
 * Storage backend:
 * - On Vercel (BLOB_READ_WRITE_TOKEN set): Vercel Blob, because the serverless
 *   filesystem is read-only and wiped between invocations.
 * - Otherwise (local dev, own server): content/site-content.json on disk.
 *
 * Server components call `await getContent()`; client components receive the
 * merged content via the ContentProvider context set up in the root layout.
 */

const CONTENT_FILE = path.join(process.cwd(), "content", "site-content.json");
const BLOB_PATHNAME = "site-content.json";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

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

/** Keep saved CMS arrays aligned with route changes introduced in code. */
function applyRouteMigrations(content: SiteContent): SiteContent {
  let hasGatesItem = false;
  const nav = content.header.nav.map((item) => {
    if (item.label.trim().toLowerCase() !== "gates") return item;

    hasGatesItem = true;
    const dropdown = item.dropdown ?? [];
    const newGatesIndex = dropdown.findIndex(
      (link) =>
        link.href === "/gates" ||
        link.label.trim().toLowerCase() === "new gates",
    );
    const updatedDropdown = dropdown.map((link, index) =>
      index === newGatesIndex ? { ...link, href: "/gates" } : link,
    );

    return {
      ...item,
      href: "/gates",
      dropdown:
        newGatesIndex >= 0
          ? updatedDropdown
          : [{ label: "New Gates", href: "/gates" }, ...updatedDropdown],
    };
  });

  if (!hasGatesItem) {
    const gatesItem = defaultContent.header.nav.find(
      (item) => item.label === "Gates",
    );
    if (gatesItem) {
      const automationIndex = nav.findIndex(
        (item) => item.label.trim().toLowerCase() === "automation",
      );
      nav.splice(
        automationIndex >= 0 ? automationIndex : nav.length,
        0,
        gatesItem,
      );
    }
  }

  return {
    ...content,
    header: { ...content.header, nav },
    services: {
      ...content.services,
      cards: content.services.cards.map((card) =>
        card.title.trim().toLowerCase() === "automatic gates"
          ? { ...card, href: "/gates" }
          : card,
      ),
    },
    howCanWeHelp: {
      ...content.howCanWeHelp,
      items: content.howCanWeHelp.items.map((item) =>
        item.label.trim().toLowerCase() === "automatic gates"
          ? { ...item, href: "/gates" }
          : item,
      ),
    },
  };
}

async function readOverridesFromBlob(): Promise<unknown | null> {
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
  const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
  if (!blob) return null;
  // Bypass the blob CDN cache so a fresh save is picked up on revalidation.
  const res = await fetch(`${blob.url}?v=${Date.parse(String(blob.uploadedAt))}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

function readOverridesFromDisk(): unknown | null {
  try {
    return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
  } catch {
    return null;
  }
}

export async function getContent(): Promise<SiteContent> {
  try {
    const overrides = useBlob()
      ? await readOverridesFromBlob()
      : readOverridesFromDisk();
    if (!overrides) return applyRouteMigrations(defaultContent);
    return applyRouteMigrations(deepMerge(defaultContent, overrides));
  } catch {
    return applyRouteMigrations(defaultContent);
  }
}

export async function saveContent(next: unknown): Promise<void> {
  if (!isPlainObject(next)) {
    throw new Error("Content must be a JSON object");
  }
  const json = JSON.stringify(next, null, 2);
  if (useBlob()) {
    await put(BLOB_PATHNAME, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  } else {
    fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
    fs.writeFileSync(CONTENT_FILE, json, "utf8");
  }
}
