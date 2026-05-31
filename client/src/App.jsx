import React from "react";
import { useGame } from "./context/GameContext";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  const { gameState } = useGame();

  if (gameState === "playing") return <GamePage />;
  if (gameState === "results") return <ResultsPage />;
  return <LobbyPage />;
}
