import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Matthew Bowman — a studio for humanitarian information";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Best-effort fetch of the real webfonts for the OG image so it matches the
// site's typography. Falls back to the renderer's default font if the
// network isn't available at build time (e.g. an offline build) — the
// image still renders correctly, just without the custom face.
async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@${weight}&display=swap`;
    const cssRes = await fetch(cssUrl, {
      headers: {
        // A UA without woff2 support gets TTF/OTF back, which satori can use.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      },
    });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [display, mono] = await Promise.all([
    loadGoogleFont("Bricolage Grotesque", 800),
    loadGoogleFont("Fragment Mono", 400),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 800; style: "normal" }[] =
    [];
  if (display) fonts.push({ name: "Bricolage Grotesque", data: display, weight: 800, style: "normal" });
  if (mono) fonts.push({ name: "Fragment Mono", data: mono, weight: 400, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F4EF",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: mono ? "Fragment Mono" : "monospace",
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#1D2BE3",
          }}
        >
          Matthew Bowman · Studio
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: display ? "Bricolage Grotesque" : "sans-serif",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: 64,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#101114",
            maxWidth: 1000,
          }}
        >
          Bridging Gaps with Inclusive Technological Solutions
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: mono ? "Fragment Mono" : "monospace",
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#585A52",
          }}
        >
          A studio for humanitarian information
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
