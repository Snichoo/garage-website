import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

/**
 * Serves admin-uploaded images at /uploads/*.
 *
 * Next.js only serves public/ files that existed at build time, so images
 * uploaded through the admin dashboard after a deploy would 404 without this
 * handler. Static files that did exist at build time still win over this
 * route, so behaviour is unchanged for them.
 */

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _request: Request,
  { params }: { params: { path: string[] } },
) {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.resolve(uploadsDir, params.path.join("/"));

  // Never serve anything outside public/uploads.
  if (!filePath.startsWith(uploadsDir + path.sep)) {
    return new NextResponse(null, { status: 404 });
  }

  const mime = MIME_TYPES[path.extname(filePath).toLowerCase()];
  if (!mime) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const data = fs.readFileSync(filePath);
    // Uploaded filenames are timestamped and never reused, so long-lived
    // immutable caching is safe.
    return new NextResponse(data, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
