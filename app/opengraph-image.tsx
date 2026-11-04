import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Nestvested: websites and brands for NGOs and international organisations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = ["#D9480F", "#B57A00", "#2457D6", "#7B3FE4", "#138A55", "#D6246E"];

// Best-effort fetch of the site's font; the image still renders without it.
async function loadFont(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Golos+Text:wght@${weight}&display=swap`,
      {
        headers: {
          // A browser without woff2 support is sent a TTF, which the renderer can use.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0 Safari/534.30",
        },
      }
    ).then((response) => (response.ok ? response.text() : ""));
    const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const font = await fetch(match[1]);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, medium] = await Promise.all([loadFont(400), loadFont(500)]);
  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" }[] = [];
  if (regular) fonts.push({ name: "Golos Text", data: regular, weight: 400, style: "normal" });
  if (medium) fonts.push({ name: "Golos Text", data: medium, weight: 500, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#242126",
          padding: "72px",
          fontFamily: fonts.length ? "Golos Text" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 72, gap: 8 }}>
            {DOTS.map((colour) => (
              <div key={colour} style={{ width: 32, height: 32, borderRadius: 16, background: colour }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 500, letterSpacing: -1.5 }}>Nestvested</div>
        </div>
        <div style={{ display: "flex", fontSize: 60, lineHeight: 1.2, letterSpacing: -1, maxWidth: 980 }}>
          Websites and brands for NGOs and international organisations.
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
