import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 84,
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: 900,
        borderRadius: "40px",
        fontFamily: "monospace",
        border: "4px solid #ef4444",
        boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#ef4444",
          letterSpacing: "-0.05em",
        }}
      >
        SP
      </div>
    </div>,
    { ...size }
  );
}
