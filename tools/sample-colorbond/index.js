#!/usr/bin/env node
/**
 * Auto-detect swatch colours from a Colorbond-style PNG grid.
 *
 * Scans the image, finds rectangular blocks of solid colour separated by
 * near-white gutters, samples the centre pixel of each, and prints the hex
 * codes in reading order (left-to-right, top-to-bottom).
 *
 * Usage:
 *   node index.js <path-to-png>            # plain hex list
 *   node index.js <path-to-png> --json     # JSON output
 *   node index.js <path-to-png> --names "Manor Red,Pale Eucalypt,..."
 */

const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node index.js <png> [--json] [--names \"A,B,C\"]");
  process.exit(1);
}

const file = args[0];
const wantJson = args.includes("--json");
const namesIdx = args.indexOf("--names");
const names =
  namesIdx >= 0 && args[namesIdx + 1]
    ? args[namesIdx + 1].split(",").map((s) => s.trim()).filter(Boolean)
    : null;

const png = PNG.sync.read(fs.readFileSync(path.resolve(file)));
const { width, height, data } = png;

function px(x, y) {
  const i = (y * width + x) << 2;
  return [data[i], data[i + 1], data[i + 2]];
}

// Sample a corner pixel to learn the true page background, then treat anything
// within a small tolerance as background. This avoids classifying warm off-white
// swatches (e.g. Dover White) as background.
const [BG_R, BG_G, BG_B] = px(2, 2);
// Use Euclidean distance — handles warm off-white swatches like Dover White
// whose channel diffs are small (~3-8) but together exceed the gutter noise.
function isBg(r, g, b) {
  const dr = r - BG_R, dg = g - BG_G, db = b - BG_B;
  return dr * dr + dg * dg + db * db < 64; // distance < 8
}

// 1. Find horizontal bands containing swatches.
const STEP = 3; // sample every 3rd pixel for speed
const rowFilled = new Uint8Array(height);
for (let y = 0; y < height; y++) {
  let nonBg = 0;
  let total = 0;
  for (let x = 0; x < width; x += STEP) {
    const [r, g, b] = px(x, y);
    if (!isBg(r, g, b)) nonBg++;
    total++;
  }
  rowFilled[y] = nonBg / total > 0.25 ? 1 : 0;
}

const bands = [];
let bs = -1;
for (let y = 0; y < height; y++) {
  if (rowFilled[y] && bs === -1) bs = y;
  else if (!rowFilled[y] && bs !== -1) {
    if (y - bs > 40) bands.push({ y0: bs, y1: y });
    bs = -1;
  }
}
if (bs !== -1 && height - bs > 40) bands.push({ y0: bs, y1: height });

// 2. Within each band, find vertical columns of swatches at the band's mid-Y.
const swatches = [];
for (const band of bands) {
  const midY = (band.y0 + band.y1) >> 1;
  const colFilled = new Uint8Array(width);
  for (let x = 0; x < width; x++) {
    const [r, g, b] = px(x, midY);
    colFilled[x] = isBg(r, g, b) ? 0 : 1;
  }
  let cs = -1;
  for (let x = 0; x <= width; x++) {
    const filled = x < width && colFilled[x];
    if (filled && cs === -1) cs = x;
    else if (!filled && cs !== -1) {
      const w = x - cs;
      if (w > 40) {
        const cx = (cs + x) >> 1;
        // Sample a small 5x5 average at the centre for robustness.
        let R = 0, G = 0, B = 0, n = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const [r, g, b] = px(cx + dx, midY + dy);
            R += r; G += g; B += b; n++;
          }
        }
        const r = Math.round(R / n);
        const g = Math.round(G / n);
        const b = Math.round(B / n);
        const hex =
          "#" +
          [r, g, b]
            .map((v) => v.toString(16).padStart(2, "0").toUpperCase())
            .join("");
        swatches.push({ row: bands.indexOf(band), x: cx, y: midY, hex });
      }
      cs = -1;
    }
  }
}

// 3. Pair with names if provided.
const out = swatches.map((s, i) => ({
  ...(names && names[i] ? { name: names[i] } : {}),
  hex: s.hex,
  row: s.row,
  x: s.x,
  y: s.y,
}));

if (wantJson) {
  console.log(JSON.stringify(out, null, 2));
} else {
  for (const s of out) {
    const label = s.name ? `${s.name.padEnd(18)} ` : "";
    console.log(`${label}${s.hex}  (row ${s.row}, x=${s.x}, y=${s.y})`);
  }
  console.log(`\n${out.length} swatches detected.`);
}
