import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
  const publicDir = path.join(process.cwd(), "public");
  const images: string[] = [];
  collectImages(path.join(publicDir, "uploads"), "/uploads", images);
  collectImages(path.join(publicDir, "images"), "/images", images);
  return NextResponse.json({ images });
}
