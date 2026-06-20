import React from "react";
import { useGame } from "../../context/GameContext";
export default function WaitingRoom() {
  const { roomId, players, isHost, startGame } = useGame();

  const hoverStyle = `
  .glass-btn:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    transform: translateY(-1px);
  }
`;
  return (
    <div style={{ maxWidth: 500, margin: "4rem auto", padding: "2rem", textAlign: "center" }}>
      <style>{hoverStyle}</style>
      <h2 style={{ marginBottom: "0.5rem" }}>Waiting Room</h2>
      <p style={{ opacity: 0.5, marginBottom: "0.5rem" }}>Share this code with friends:</p>
      <div style={{ fontSize: "2.5rem", fontWeight: "bold", letterSpacing: "0.3em", color: "#ffd166", marginBottom: "2rem" }}>{roomId}</div>
      <h3 style={{ marginBottom: "1rem" }}>Players ({players.length})</h3>
      {players.map((p) => <div key={p.id} style={{ padding: "0.6rem 1rem", marginBottom: "0.5rem", background: "#ffffff11", borderRadius: 8 }}>{p.name}</div>)}
      {isHost
? <button
className="glass-btn"
onClick={startGame}
style={{
  marginTop: "2rem",
  padding: "0.75rem 2rem",
  background: "rgba(108, 99, 255, 0.2)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#fff",
  border: "1px solid rgba(108, 99, 255, 0.45)",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "transform 0.2s, background 0.2s, border-color 0.2s",
}}
>
Start Game →
</button>        : <p style={{ marginTop: "2rem", opacity: 0.5 }}>Waiting for host to start...</p>}
    </div>
  );
}
