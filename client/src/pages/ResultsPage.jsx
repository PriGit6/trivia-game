import React from "react";
import { useGame } from "../context/GameContext";
export default function ResultsPage() {
  const { finalScores, resetGame } = useGame();
  const sorted = [...finalScores].sort((a, b) => b.score - a.score);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div style={{ maxWidth: 500, margin: "4rem auto", textAlign: "center", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>🏆 Final Results</h1>
      {sorted.map((p, i) => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 1rem", marginBottom: "0.5rem", background: i === 0 ? "#ffd70022" : "#ffffff11", borderRadius: 8 }}>
          <span>{medals[i] || (i + 1) + "."} {p.name}</span>
          <span>{p.score} pts</span>
        </div>
      ))}
      <button onClick={resetGame} style={{ marginTop: "2rem", padding: "0.75rem 2rem", background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "1rem" }}>
        Play Again
      </button>
    </div>
  );
}
