import React, { useState } from "react";
import { useGame } from "../../context/GameContext";
export default function JoinCreate() {
  const { createRoom, joinRoom } = useGame();
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState(null);
  const inputStyle = { width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: 8, border: "1px solid #444", background: "#1a1a2e", color: "#fff", fontSize: "1rem" };
  const btnStyle = (bg) => ({ flex: 1, padding: "0.75rem", background: bg, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "1rem" });
  const handleCreate = () => { if (!name.trim()) return setError("Enter your name"); createRoom(name.trim(), (res) => { if (!res.success) setError(res.error); }); };
  const handleJoin = () => { if (!name.trim() || !roomCode.trim()) return setError("Enter your name and room code"); joinRoom(roomCode.trim(), name.trim(), (res) => { if (!res.success) setError(res.error); }); };
  return (
    <div style={{ maxWidth: 400, margin: "6rem auto", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎮 Trivia Battle</h1>
      <p style={{ opacity: 0.5, marginBottom: "2rem" }}>Real-time multiplayer trivia</p>
      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      {mode === "join" && <input placeholder="Room code" value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} style={{ ...inputStyle, textTransform: "uppercase" }} />}
      {error && <p style={{ color: "#ff6b6b", marginBottom: "1rem" }}>{error}</p>}
      <div style={{ display: "flex", gap: "1rem" }}>
        {mode !== "join" && <button onClick={mode === "create" ? handleCreate : () => setMode("create")} style={btnStyle("#6c63ff")}>{mode === "create" ? "Create Room" : "Create Game"}</button>}
        {mode !== "create" && <button onClick={mode === "join" ? handleJoin : () => setMode("join")} style={btnStyle("#ff6b6b")}>{mode === "join" ? "Join Room" : "Join Game"}</button>}
      </div>
      {mode && <button onClick={() => { setMode(null); setError(""); }} style={{ marginTop: "1rem", background: "none", border: "none", color: "#aaa", cursor: "pointer" }}>← Back</button>}
    </div>
  );
}
