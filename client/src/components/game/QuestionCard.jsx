import React, { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import Timer from "./Timer";
export default function QuestionCard() {
  const { currentQuestion, questionMeta, questionResult, submitAnswer } = useGame();
  const [selected, setSelected] = useState(null);
  useEffect(() => setSelected(null), [currentQuestion]);
  if (!currentQuestion) return <p style={{ textAlign: "center" }}>Loading question...</p>;
  const handleAnswer = (i) => {
    if (selected !== null || questionResult) return;
    setSelected(i);
    submitAnswer(i);
  };
  return (
    <div>
      {questionMeta && <Timer key={currentQuestion.id} duration={questionMeta.timeLimit} />}
      <div style={{ background: "#1a1a2e", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", lineHeight: 1.5 }}>{currentQuestion.question}</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {currentQuestion.options.map((opt, i) => {
          let bg = "#1a1a2e";
          if (questionResult) { if (i === questionResult.correctAnswer) bg = "#2d6a4f"; else if (i === selected) bg = "#6b2d2d"; }
          else if (i === selected) bg = "#3a3a6e";
          return <button key={i} onClick={() => handleAnswer(i)} style={{ padding: "1rem", background: bg, color: "#fff", border: "1px solid #333", borderRadius: 10, cursor: selected !== null ? "default" : "pointer", fontSize: "0.95rem", textAlign: "left", transition: "background 0.3s" }}>{opt}</button>;
        })}
      </div>
      {questionResult && <p style={{ textAlign: "center", marginTop: "1rem", opacity: 0.6 }}>{selected === questionResult.correctAnswer ? "✅ Correct!" : "❌ Wrong"} — Next question coming up...</p>}
    </div>
  );
}
