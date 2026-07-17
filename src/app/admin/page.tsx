"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";

/**
 * Admin dashboard. Loads the full site content object and renders a form for
 * every field in it, grouped by section. Any string, list or image in the
 * content store is editable here; saving writes content/site-content.json and
 * refreshes the live site.
 */

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type JsonObject = { [key: string]: JsonValue };

const SECTION_LABELS: Record<string, { label: string; hint?: string }> = {
  business: {
    label: "Business Details",
    hint: "Name, phone number, email and logo. These update everywhere they appear on the site, including Google search data.",
  },
  header: { label: "Header & Menu" },
  hero: { label: "Homepage Hero" },
  featureStrip: { label: "Feature Strip" },
  services: { label: "Services Cards" },
  reviews: { label: "Reviews" },
  howCanWeHelp: { label: "We Help With" },
  meetTheTeam: { label: "Meet The Team" },
  whyChooseUs: { label: "Why Choose Us" },
  areasWeServe: { label: "Areas We Serve" },
  workGallery: { label: "Our Work Gallery" },
  locationMap: {
    label: "Location Map",
    hint: "The place shown on the Google map, e.g. Brisbane, Queensland, Australia.",
  },
  faq: { label: "FAQ" },
  quoteModal: { label: "Quote Popup" },
  quoteForm: { label: "Quote Form Fields" },
  contactForm: { label: "Contact Form Fields" },
  ctaBanner: { label: "Bottom Call To Action" },
  footer: { label: "Footer" },
  contactPage: { label: "Contact Page" },
};

const FIELD_LABELS: Record<string, string> = {
  phoneDisplay: "Phone Number (as shown on the site)",
  phoneLink: "Phone Number for dialing (digits only, e.g. 0731803857)",
  areaServed: "Area Served",
  nav: "Menu Items",
  q: "Question",
  a: "Answer",
  avatarBg: "Avatar Colour (hex)",
  avatar: "Avatar Letter",
};

function labelize(key: string): string {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function isImageKey(key: string): boolean {
  return /(image|icon|photo|logo)$/i.test(key);
}

function setAtPath(root: JsonValue, path: (string | number)[], value: JsonValue): JsonValue {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = root.slice();
    copy[head as number] = setAtPath(copy[head as number], rest, value);
    return copy;
  }
  const obj = { ...(root as JsonObject) };
  obj[head as string] = setAtPath(obj[head as string], rest, value);
  return obj;
}

/* ---------- image picker ---------- */

function ImageLibraryModal({
  onSelect,
  onClose,
}: {
  onSelect: (path: string) => void;
  onClose: () => void;
}) {
  const [images, setImages] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/images")
      .then((r) => r.json())
      .then((d) => setImages(d.images || []))
      .catch(() => setImages([]));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="font-display text-lg font-extrabold text-brand-navy">
            Choose an image
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-sm font-bold text-neutral-500 hover:text-neutral-800"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          {images === null ? (
            <p className="p-4 text-sm text-neutral-500">Loading images...</p>
          ) : images.length === 0 ? (
            <p className="p-4 text-sm text-neutral-500">No images found.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {images.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onSelect(src)}
                  className="group overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition hover:ring-2 hover:ring-brand-navy"
                  title={src}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-20 w-full object-contain p-1"
                  />
                  <span className="block truncate px-1 pb-1 text-[10px] text-neutral-500">
                    {src.split("/").pop()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
        {value ? (
          <img src={value} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="text-xs text-neutral-400">No image</span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-600 outline-none focus:border-brand-navy"
        />
        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-md bg-brand-navy px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90">
            {uploading ? "Uploading..." : "Upload new"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-700 transition hover:border-brand-navy hover:text-brand-navy"
          >
            Choose existing
          </button>
          {error && (
            <span className="text-xs font-semibold text-red-600">{error}</span>
          )}
        </div>
      </div>
      {libraryOpen && (
        <ImageLibraryModal
          onClose={() => setLibraryOpen(false)}
          onSelect={(src) => {
            onChange(src);
            setLibraryOpen(false);
          }}
        />
      )}
    </div>
  );
}

/* ---------- generic field renderer ---------- */

function Field({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: JsonValue;
  onChange: (v: JsonValue) => void;
}) {
  if (typeof value === "string") {
    if (isImageKey(fieldKey)) {
      return (
        <div>
          <FieldLabel fieldKey={fieldKey} />
          <ImageField value={value} onChange={onChange} />
        </div>
      );
    }
    const long = value.length > 70 || value.includes("\n");
    return (
      <div>
        <FieldLabel fieldKey={fieldKey} />
        {long ? (
          <textarea
            value={value}
            rows={Math.min(8, Math.max(2, Math.ceil(value.length / 80)))}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/30"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/30"
          />
        )}
        {value.includes("{") && (
          <p className="mt-1 text-xs text-neutral-500">
            Placeholders like {"{suburb}"}, {"{phone}"} and {"{year}"} are
            filled in automatically on the site.
          </p>
        )}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-bold text-neutral-800">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
        {labelize(fieldKey)}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div>
        <FieldLabel fieldKey={fieldKey} />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-navy"
        />
      </div>
    );
  }

  if (Array.isArray(value)) {
    return <ArrayField fieldKey={fieldKey} value={value} onChange={onChange} />;
  }

  if (value && typeof value === "object") {
    return (
      <fieldset className="rounded-lg border border-neutral-200 p-3">
        <legend className="px-1 text-sm font-extrabold text-brand-navy">
          {labelize(fieldKey)}
        </legend>
        <ObjectFields value={value as JsonObject} onChange={onChange} />
      </fieldset>
    );
  }

  return null;
}

function FieldLabel({ fieldKey }: { fieldKey: string }) {
  return (
    <span className="mb-1 block text-sm font-bold text-neutral-800">
      {labelize(fieldKey)}
    </span>
  );
}

function ObjectFields({
  value,
  onChange,
}: {
  value: JsonObject;
  onChange: (v: JsonValue) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(value).map(([key, child]) => (
        <Field
          key={key}
          fieldKey={key}
          value={child}
          onChange={(v) => onChange({ ...value, [key]: v })}
        />
      ))}
    </div>
  );
}

function makeBlankLike(sample: JsonValue): JsonValue {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return sample;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const out: JsonObject = {};
    for (const [k, v] of Object.entries(sample)) out[k] = makeBlankLike(v);
    return out;
  }
  return null;
}

function ArrayField({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: JsonValue[];
  onChange: (v: JsonValue) => void;
}) {
  const isStringList = value.every((v) => typeof v === "string");

  function addItem() {
    if (value.length === 0) {
      onChange([...value, ""]);
      return;
    }
    const last = value[value.length - 1];
    // Clone the last item so colours, links and structure carry over.
    const clone =
      typeof last === "object" && last !== null
        ? JSON.parse(JSON.stringify(last))
        : makeBlankLike(last);
    onChange([...value, clone]);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-extrabold text-brand-navy">
          {labelize(fieldKey)}
        </span>
        <button
          type="button"
          onClick={addItem}
          className="rounded-md border border-brand-navy px-3 py-1 text-xs font-bold text-brand-navy transition hover:bg-brand-navy hover:text-white"
        >
          + Add
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {value.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg border border-neutral-200 bg-neutral-50/60 p-3"
          >
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute right-2 top-2 rounded px-2 py-0.5 text-xs font-bold text-red-500 transition hover:bg-red-50"
              title="Remove item"
            >
              Remove
            </button>
            {isStringList ? (
              <input
                type="text"
                value={item as string}
                onChange={(e) =>
                  onChange(setAtPath(value, [index], e.target.value))
                }
                className="w-[calc(100%-80px)] rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-navy"
              />
            ) : typeof item === "object" && item !== null && !Array.isArray(item) ? (
              <div className="pt-5">
                <ObjectFields
                  value={item as JsonObject}
                  onChange={(v) => onChange(setAtPath(value, [index], v))}
                />
              </div>
            ) : (
              <Field
                fieldKey={`${fieldKey} ${index + 1}`}
                value={item}
                onChange={(v) => onChange(setAtPath(value, [index], v))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function AdminPage() {
  const [content, setContent] = useState<JsonObject | null>(null);
  const [loadError, setLoadError] = useState("");
  const [activeSection, setActiveSection] = useState<string>("business");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        if (!r.ok) throw new Error("Could not load content.");
        return r.json();
      })
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) =>
        setLoadError(err instanceof Error ? err.message : "Load failed."),
      );
  }, []);

  const sections = useMemo(
    () => (content ? Object.keys(content) : []),
    [content],
  );

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  async function handleSave() {
    if (!content || saving) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setDirty(false);
      setSaveMessage({ kind: "ok", text: "Saved. The live site is updated." });
    } catch (err) {
      setSaveMessage({
        kind: "error",
        text: err instanceof Error ? err.message : "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loadError) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-semibold text-red-600">{loadError}</p>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-neutral-500">Loading editor...</p>
      </main>
    );
  }

  const active = sections.includes(activeSection) ? activeSection : sections[0];

  return (
    <main className="min-h-screen pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-extrabold text-brand-navy">
              Website Editor
            </h1>
            <p className="hidden text-xs text-neutral-500 sm:block">
              Edit any text or image, then press Save to publish.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span
                className={`hidden text-xs font-semibold sm:inline ${
                  saveMessage.kind === "ok" ? "text-green-600" : "text-red-600"
                }`}
              >
                {saveMessage.text}
              </span>
            )}
            <a
              href="/"
              target="_blank"
              className="rounded-md border border-neutral-300 px-3 py-2 text-xs font-bold text-neutral-700 transition hover:border-brand-navy hover:text-brand-navy"
            >
              View site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-neutral-300 px-3 py-2 text-xs font-bold text-neutral-700 transition hover:border-red-500 hover:text-red-600"
            >
              Log out
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-brand-navy px-5 py-2 font-display text-sm font-extrabold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : dirty ? "Save changes" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        {/* Section nav */}
        <nav className="flex shrink-0 gap-1 overflow-x-auto md:w-56 md:flex-col md:overflow-visible">
          {sections.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-bold transition md:whitespace-normal ${
                key === active
                  ? "bg-brand-navy text-white"
                  : "text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {SECTION_LABELS[key]?.label ?? labelize(key)}
            </button>
          ))}
        </nav>

        {/* Active section form */}
        <div className="min-w-0 flex-1 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:p-6">
          <h2 className="font-display text-xl font-extrabold text-brand-navy">
            {SECTION_LABELS[active]?.label ?? labelize(active)}
          </h2>
          {SECTION_LABELS[active]?.hint && (
            <p className="mt-1 text-sm text-neutral-500">
              {SECTION_LABELS[active].hint}
            </p>
          )}
          <div className="mt-5">
            {content[active] &&
            typeof content[active] === "object" &&
            !Array.isArray(content[active]) ? (
              <ObjectFields
                value={content[active] as JsonObject}
                onChange={(v) => {
                  setContent({ ...content, [active]: v });
                  setDirty(true);
                  setSaveMessage(null);
                }}
              />
            ) : (
              <Field
                fieldKey={active}
                value={content[active]}
                onChange={(v) => {
                  setContent({ ...content, [active]: v });
                  setDirty(true);
                  setSaveMessage(null);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile save message */}
      {saveMessage && (
        <p
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-bold shadow-lg sm:hidden ${
            saveMessage.kind === "ok"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {saveMessage.text}
        </p>
      )}
    </main>
  );
}
