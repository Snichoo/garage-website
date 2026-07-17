import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Invalid content payload." },
      { status: 400 },
    );
  }

  try {
    saveContent(body);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save." },
      { status: 500 },
    );
  }

  // Purge every cached page so the new content shows immediately.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
