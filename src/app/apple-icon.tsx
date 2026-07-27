import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 110,
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 900,
        borderRadius: "36px",
        fontFamily: "sans-serif",
        border: "6px solid rgba(59, 130, 246, 0.4)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)",
          backgroundClip: "text",
          color: "transparent",
          display: "flex",
        }}
      >
        S
      </div>
    </div>,
    { ...size }
  );
}
