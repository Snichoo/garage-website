import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "sparrowgaragedoors@gmail.com";

/**
 * Built on first use rather than at module scope. The Resend constructor throws
 * when the key is missing, and Next.js loads this module during `next build`
 * ("Collecting page data"), which would fail the build in any environment
 * without RESEND_API_KEY set (e.g. preview deployments). The handler below
 * already returns a clean 500 when the key is absent.
 */
let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

// Resend requires a verified domain to use a custom "from" address.
// Until the domain is verified, use the shared onboarding sender.
const FROM_EMAIL = "Sparrow Garage Doors <onboarding@resend.dev>";

type Field = { label: string; value: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(heading: string, fields: Field[]) {
  const rows = fields
    .map(
      (f) =>
        `<tr>
          <td style="padding:8px 12px;font-weight:bold;background:#0b1f3a;color:#ffd400;vertical-align:top;white-space:nowrap;">${escapeHtml(
            f.label
          )}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(
            f.value
          ).replace(/\n/g, "<br/>")}</td>
        </tr>`
    )
    .join("");

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0b1f3a;">${escapeHtml(heading)}</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rows}</table>
    </div>`;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const formType = data.formType === "quote" ? "quote" : "contact";

  const name =
    typeof data.name === "string" && data.name.trim()
      ? data.name.trim()
      : [data.firstName, data.lastName]
          .filter((v) => typeof v === "string" && v.trim())
          .map((v) => (v as string).trim())
          .join(" ");
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  const heading =
    formType === "quote"
      ? "New Free Quote Request"
      : "New Contact Form Message";

  const fields: Field[] = [];
  if (name) fields.push({ label: "Name", value: name });
  if (email) fields.push({ label: "Email", value: email });
  if (phone) fields.push({ label: "Phone", value: phone });
  if (message) fields.push({ label: "Message", value: message });

  if (fields.length === 0) {
    return NextResponse.json(
      { error: "Please fill in at least one field." },
      { status: 400 }
    );
  }

  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email || undefined,
      subject: name ? `${heading} - ${name}` : heading,
      html: buildHtml(heading, fields),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
