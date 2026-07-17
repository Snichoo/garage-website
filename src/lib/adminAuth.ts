/**
 * Cookie-session auth for the admin area. Tokens are HMAC-SHA256 signed with
 * ADMIN_SESSION_SECRET (falls back to ADMIN_PASSWORD as key material), using
 * the Web Crypto API so the same code runs in middleware (edge) and routes.
 */

export const SESSION_COOKIE = "sparrow_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ""
  );
}

async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const signature = await sign(`admin.${expires}`);
  return `${expires}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  if (!getSecret()) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const expires = Number(token.slice(0, dot));
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = await sign(`admin.${expires}`);
  return timingSafeEqual(token.slice(dot + 1), expected);
}
