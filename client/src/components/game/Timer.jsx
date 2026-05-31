import React, { useState, useEffect } from "react";
export default function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  useEffect(() => {
    setTimeLeft(duration);
    const interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, [duration]);
  const pct = (timeLeft / duration) * 100;
  const color = timeLeft > 10 ? "#6c63ff" : timeLeft > 5 ? "#ffa500" : "#ff4444";
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span style={{ opacity: 0.5, fontSize: "0.85rem" }}>Time left</span>
        <span style={{ color, fontWeight: "bold" }}>{timeLeft}s</span>
      </div>
      <div style={{ background: "#333", borderRadius: 4, height: 6 }}>
        <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 4, transition: "width 1s linear, background 0.3s" }} />
      </div>
    </div>
  );
}
