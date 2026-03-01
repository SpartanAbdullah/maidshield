import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "2px solid #cbd5e1",
            borderRadius: "28px",
            background: "rgba(255,255,255,0.92)",
            padding: "56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#475569" }}>
              MaidShield
            </div>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
              UAE domestic worker gratuity planning
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.4, color: "#334155", maxWidth: 860 }}>
              Clear end-of-service estimates, checklist guidance, and transparent assumptions
              for household employers.
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#475569" }}>
            www.maidshield.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
