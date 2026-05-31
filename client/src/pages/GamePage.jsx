import React from "react";
import QuestionCard from "../components/game/QuestionCard";
import Scoreboard from "../components/game/Scoreboard";
import { useGame } from "../context/GameContext";
export default function GamePage() {
  const { questionMeta } = useGame();
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem" }}>
      {questionMeta && (
        <p style={{ textAlign: "center", marginBottom: "1rem", opacity: 0.6 }}>
          Question {questionMeta.questionNumber} of {questionMeta.totalQuestions}
        </p>
      )}
      <QuestionCard />
      <Scoreboard />
    </div>
  );
}
