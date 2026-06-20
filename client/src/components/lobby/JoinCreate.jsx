/*import React, { useState } from "react";
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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Trivia Battle</h1>
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
}*/

import React, { useState } from "react";
import { useGame } from "../../context/GameContext";

export default function JoinCreate() {
  const { createRoom, joinRoom } = useGame();
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState(null);

  // Glassmorphism constants
  const glassStyle = {
    // Increased opacity (0.15) and made background lighter (white-ish)
    background: "rgba(255, 255, 255, 0.05)", 
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
    // Increased padding for a longer/taller look
    padding: "4rem 2rem", 
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
  };

  const inputStyle = {
    ...glassStyle,
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box", // Ensure padding doesn't affect width
  };

  const inputStyles = `
  .glass-input::placeholder {
    color: #aaa; 
    opacity: 1;   
  }
  .glass-btn:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    transform: translateY(-1px);
  }
`;

const btnStyle = (bg, borderColor) => ({
  flex: 1,
  padding: "0.75rem",
  background: bg,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#fff",
  border: `1px solid ${borderColor}`,
  borderRadius: 8,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "transform 0.2s, background 0.2s, border-color 0.2s",
});

  const handleCreate = () => { if (!name.trim()) return setError("Enter your name"); createRoom(name.trim(), (res) => { if (!res.success) setError(res.error); }); };
  const handleJoin = () => { if (!name.trim() || !roomCode.trim()) return setError("Enter your name and room code"); joinRoom(roomCode.trim(), name.trim(), (res) => { if (!res.success) setError(res.error); }); };

  return (
    
    <div style={{ 
      maxWidth: 400, 
      margin: "6rem auto", 
      textAlign: "center",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <style>{inputStyles}</style>
    
      <div style={{ ...glassStyle, textAlign: "left" }}>
  <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Trivia Battle</h1>
  <p style={{ opacity: 0.8, marginBottom: "2rem" }}>Real-time multiplayer trivia</p>
        <input 
        className="glass-input"
          placeholder="Your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={inputStyle} 
        />
        
        {mode === "join" && (
          <input 
          className="glass-input"
            placeholder="Room code" 
            value={roomCode} 
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())} 
            style={inputStyle} 
          />
        )}
        
        {error && <p style={{ color: "#ff6b6b", marginBottom: "1rem", fontSize: "0.9rem" }}>{error}</p>}
        
        
        {/* Buttons with glassmorphism styles and hover effects */}
        <div style={{ display: "flex", gap: "1rem" }}>
  {mode !== "join" && (
    <button
      className="glass-btn"
      onClick={mode === "create" ? handleCreate : () => setMode("create")}
      style={btnStyle("rgba(108, 99, 255, 0.2)", "rgba(108, 99, 255, 0.45)")}
    >
      {mode === "create" ? "Create Room" : "Create Game"}
    </button>
  )}
  {mode !== "create" && (
    <button
      className="glass-btn"
      onClick={mode === "join" ? handleJoin : () => setMode("join")}
      style={btnStyle("rgba(255, 107, 107, 0.18)", "rgba(255, 107, 107, 0.4)")}
    >
      {mode === "join" ? "Join Room" : "Join Game"}
    </button>
  )}
</div>
        
        {mode && (
          <button 
            onClick={() => { setMode(null); setError(""); }} 
            style={{ marginTop: "1.5rem", background: "none", border: "none", color: "#ddd", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
