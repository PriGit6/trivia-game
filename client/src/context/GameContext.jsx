import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { socket } from "../utils/socket";

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState("lobby");
  const [player, setPlayer] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionMeta, setQuestionMeta] = useState(null);
  const [questionResult, setQuestionResult] = useState(null);
  const [finalScores, setFinalScores] = useState([]);
  const [answerCount, setAnswerCount] = useState({ answered: 0, total: 0 });

  useEffect(() => {
    socket.on("player_joined", ({ players }) => setPlayers(players));
    socket.on("player_left", ({ players }) => setPlayers(players));
    socket.on("game_started", () => { setGameState("playing"); setQuestionResult(null); });
    socket.on("new_question", ({ question, questionNumber, totalQuestions, timeLimit }) => {
      setCurrentQuestion(question);
      setQuestionMeta({ questionNumber, totalQuestions, timeLimit });
      setQuestionResult(null);
    });
    socket.on("answer_count", setAnswerCount);
    socket.on("question_result", (result) => setQuestionResult(result));
    socket.on("game_over", ({ finalScores }) => { setFinalScores(finalScores); setGameState("results"); });
    return () => socket.removeAllListeners();
  }, []);

  const createRoom = useCallback((playerName, callback) => {
    socket.emit("create_room", { playerName }, (res) => {
      if (res.success) { setPlayer(res.player); setRoomId(res.roomId); setPlayers([res.player]); setIsHost(true); }
      callback(res);
    });
  }, []);

  const joinRoom = useCallback((roomId, playerName, callback) => {
    socket.emit("join_room", { roomId, playerName }, (res) => {
      if (res.success) { setPlayer(res.player); setRoomId(res.roomId); setPlayers(res.players); setIsHost(false); }
      callback(res);
    });
  }, []);

  const startGame = useCallback(() => {
    socket.emit("start_game", { roomId }, (res) => { if (!res.success) alert(res.error); });
  }, [roomId]);

  const submitAnswer = useCallback((answerIndex) => {
    socket.emit("submit_answer", { roomId, answerIndex });
  }, [roomId]);

  const resetGame = useCallback(() => {
    setGameState("lobby"); setPlayer(null); setRoomId(null);
    setPlayers([]); setIsHost(false); setCurrentQuestion(null); setFinalScores([]);
  }, []);

  return (
    <GameContext.Provider value={{ gameState, player, roomId, players, isHost, currentQuestion, questionMeta, questionResult, finalScores, answerCount, createRoom, joinRoom, startGame, submitAnswer, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
