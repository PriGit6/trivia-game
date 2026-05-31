import React from "react";
import { useGame } from "../../context/GameContext";
export default function Scoreboard() {
  const { players, answerCount } = useGame();
  const sorted = [...players].sort((a, b) => b.score - a.score);
  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h3>Scoreboard</h3>
        <span style={{ opacity: 0.5, fontSize: "0.85rem" }}>{answerCount.answered}/{answerCount.total} answered</span>
      </div>
      {sorted.map((p, i) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", marginBottom: "0.4rem", background: "#ffffff08", borderRadius: 6 }}>
          <span>{i + 1}. {p.name}</span>
          <span style={{ color: "#6c63ff" }}>{p.score} pts</span>
        </div>
      ))}
    </div>
  );
}
