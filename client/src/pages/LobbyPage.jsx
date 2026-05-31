import React from "react";
import JoinCreate from "../components/lobby/JoinCreate";
import WaitingRoom from "../components/lobby/WaitingRoom";
import { useGame } from "../context/GameContext";
export default function LobbyPage() {
  const { roomId } = useGame();
  return roomId ? <WaitingRoom /> : <JoinCreate />;
}
