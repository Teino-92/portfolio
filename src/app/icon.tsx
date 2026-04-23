import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const syneRes = await fetch(
    "https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_04uT6k.woff"
  );
  const syne = await syneRes.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5F0E8",
          color: "#1A1A18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Syne",
          fontWeight: 800,
          fontSize: 38,
          letterSpacing: "-0.05em",
          borderRadius: 12,
        }}
      >
        MG
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: syne,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
