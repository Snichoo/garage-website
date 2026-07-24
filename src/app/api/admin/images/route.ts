import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
]);

function collectImages(dir: string, urlPrefix: string, out: string[]): void {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const urlPath = `${urlPrefix}/${entry.name}`;
    if (entry.isDirectory()) {
      collectImages(fullPath, urlPath, out);
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      out.push(urlPath);
    }
  }
}

export async function GET() {
  const images: string[] = [];

  // Admin uploads: Vercel Blob in production, public/uploads locally.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "uploads/", limit: 1000 });
      for (const blob of blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))) {
        images.push(blob.url);
      }
    } catch {
      // Blob listing failed; fall through with whatever else we can find.
    }
  } else {
    collectImages(path.join(process.cwd(), "public", "uploads"), "/uploads", images);
  }

  // Images bundled with the site (public/images is traced into this function
  // via outputFileTracingIncludes in next.config.js so it exists on Vercel).
  collectImages(path.join(process.cwd(), "public", "images"), "/images", images);

  return NextResponse.json({ images });
}
