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
  const [display, archivo] = await Promise.all([
    loadGoogleFont("Libre Caslon Display", 400),
    loadGoogleFont("Archivo", 600),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[] =
    [];
  if (display) fonts.push({ name: "Libre Caslon Display", data: display, weight: 400, style: "normal" });
  if (archivo) fonts.push({ name: "Archivo", data: archivo, weight: 600, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F2EC",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: archivo ? "Archivo" : "sans-serif",
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#12130E",
          }}
        >
          Matthew Bowman · Studio
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: display ? "Libre Caslon Display" : "serif",
            fontWeight: 400,
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: -1,
            color: "#12130E",
            maxWidth: 980,
          }}
        >
          Bridging Gaps with Inclusive Technological Solutions
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: archivo ? "Archivo" : "sans-serif",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#66675E",
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
