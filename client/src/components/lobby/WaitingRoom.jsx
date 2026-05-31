import React from "react";
import { useGame } from "../../context/GameContext";
export default function WaitingRoom() {
  const { roomId, players, isHost, startGame } = useGame();
  return (
    <div style={{ maxWidth: 500, margin: "4rem auto", padding: "2rem", textAlign: "center" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Waiting Room</h2>
      <p style={{ opacity: 0.5, marginBottom: "0.5rem" }}>Share this code with friends:</p>
      <div style={{ fontSize: "2.5rem", fontWeight: "bold", letterSpacing: "0.3em", color: "#6c63ff", marginBottom: "2rem" }}>{roomId}</div>
      <h3 style={{ marginBottom: "1rem" }}>Players ({players.length})</h3>
      {players.map((p) => <div key={p.id} style={{ padding: "0.6rem 1rem", marginBottom: "0.5rem", background: "#ffffff11", borderRadius: 8 }}>{p.name}</div>)}
      {isHost
        ? <button onClick={startGame} style={{ marginTop: "2rem", padding: "0.75rem 2rem", background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "1rem" }}>Start Game →</button>
        : <p style={{ marginTop: "2rem", opacity: 0.5 }}>Waiting for host to start...</p>}
    </div>
  );
}
