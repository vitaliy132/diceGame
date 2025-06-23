import React from "react";

// Helper to format seconds as HH:MM:SS
const formatTime = (secs) => {
  const h = Math.floor(secs / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((secs % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export default function RollsBar({ rolls, secondsLeft }) {
  return (
    <>
      <div style={{ width: 346, margin: "0 auto 16px auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 6,
          }}>
          <span
            style={{
              fontFamily: "font/main",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "100%",
              letterSpacing: 0,
              color: "#FFFFFF",
            }}>
            Available rolls
          </span>
          <span
            style={{
              fontFamily: "font/main",
              fontWeight: 700,
              fontSize: 20,
              lineHeight: "100%",
              letterSpacing: 0,
              color: "#FFFFFF",
            }}>
            {rolls}/10
          </span>
        </div>
        <div style={{ display: "flex", height: 16, width: 346, gap: 2 }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 33.69999694824219,
                height: 16,
                background:
                  i < rolls ? "linear-gradient(180deg, #FFD600 0%, #FFA200 100%)" : "#fef9c3",
                boxShadow: i < rolls ? "0px 1px 0px 0px #FFFFFFCC inset" : undefined,
                borderRadius: 2,
                borderTopLeftRadius: i === 0 ? 8 : 2,
                borderBottomLeftRadius: i === 0 ? 8 : 2,
                borderTopRightRadius: i === 9 ? 8 : 2,
                borderBottomRightRadius: i === 9 ? 8 : 2,
                transition: "background 0.3s",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 81,
            height: 24,
            fontFamily: "font/main",
            fontWeight: 700,
            fontSize: 14,
            lineHeight: "100%",
            letterSpacing: 0,
            color: "#FFFFFF99",
            marginBottom: "16px",
            border: "1px solid #FFFFFF33",
            borderRadius: 8,
          }}>
          {rolls === 10 ? "Full" : formatTime(secondsLeft)}
        </div>
      </div>
    </>
  );
}
