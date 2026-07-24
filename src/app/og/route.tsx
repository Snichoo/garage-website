import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site";

// Plain endpoint (not a metadata file convention) that renders the shared
// 1200x630 social card. Referenced explicitly from every page's metadata so
// each route reliably ships one correctly sized Open Graph / Twitter image.
// Node runtime (not edge) so the editable content store can be read from disk.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const cfg = await getSiteConfig();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#15355E",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 60,
              height: 12,
              backgroundColor: "#FDD710",
              marginRight: 22,
            }}
          />
          <div
            style={{
              color: "#FDD710",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 6,
            }}
          >
            {cfg.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontSize: 100,
              fontWeight: 800,
              lineHeight: 1.02,
            }}
          >
            {`Garage Doors ${cfg.primaryLocation}`}
          </div>
          <div
            style={{
              color: "#FDD710",
              fontSize: 46,
              fontWeight: 700,
              marginTop: 18,
            }}
          >
            Installation, Replacement & Repairs
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "white", fontSize: 38, fontWeight: 700 }}>
            {`Free quotes. Call ${cfg.phoneDisplay}`}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    },
  );
}
