const Room = require("../models/Room");
const { getRoom, setRoom, deleteRoom } = require("../controllers/roomController");
const { getRandomQuestions } = require("../config/questions");

const QUESTION_TIME = 20;

const registerGameHandlers = (io, socket) => {
  socket.on("create_room", ({ playerName }, callback) => {
    const room = new Room(socket.id, playerName);
    setRoom(room.id, room);
    socket.join(room.id);
    callback({ success: true, roomId: room.id, player: room.players[0] });
  });

  socket.on("join_room", ({ roomId, playerName }, callback) => {
    const room = getRoom(roomId.toUpperCase());
    if (!room) return callback({ success: false, error: "Room not found" });
    if (room.status !== "waiting") return callback({ success: false, error: "Game already started" });
    room.addPlayer(socket.id, playerName);
    socket.join(room.id);
    const newPlayer = room.players.find((p) => p.id === socket.id);
    callback({ success: true, roomId: room.id, player: newPlayer, players: room.players });
    socket.to(room.id).emit("player_joined", { players: room.players });
  });

  socket.on("start_game", ({ roomId }, callback) => {
    const room = getRoom(roomId);
    if (!room) return callback({ success: false, error: "Room not found" });
    if (room.hostId !== socket.id) return callback({ success: false, error: "Only the host can start" });
    room.questions = getRandomQuestions(5);
    room.status = "playing";
    io.to(room.id).emit("game_started", { totalQuestions: room.questions.length });
    sendQuestion(io, room);
    callback({ success: true });
  });

  socket.on("submit_answer", ({ roomId, answerIndex }) => {
    const room = getRoom(roomId);
    if (!room || room.status !== "playing") return;
    room.recordAnswer(socket.id, answerIndex);
    io.to(room.id).emit("answer_count", { answered: Object.keys(room.answers).length, total: room.players.length });
    if (room.allAnswered()) endQuestion(io, room);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomId) => {
      const room = getRoom(roomId);
      if (!room) return;
      room.removePlayer(socket.id);
      if (room.players.length === 0) deleteRoom(roomId);
      else io.to(roomId).emit("player_left", { players: room.players });
    });
  });
};

const sendQuestion = (io, room) => {
  const question = room.getSafeQuestion();
  if (!question) return;
  io.to(room.id).emit("new_question", {
    question,
    questionNumber: room.currentQuestionIndex + 1,
    totalQuestions: room.questions.length,
    timeLimit: QUESTION_TIME,
  });
  room._questionTimer = setTimeout(() => endQuestion(io, room), QUESTION_TIME * 1000 + 500);
};

const endQuestion = (io, room) => {
  if (room._questionTimer) clearTimeout(room._questionTimer);
  room.scoreRound();
  const correctAnswer = room.getCurrentQuestion()?.answer;
  io.to(room.id).emit("question_result", { correctAnswer, scores: room.players, answers: room.answers });
  setTimeout(() => {
    if (room.nextQuestion()) sendQuestion(io, room);
    else {
      room.status = "results";
      io.to(room.id).emit("game_over", { finalScores: room.players });
    }
  }, 3000);
};

module.exports = { registerGameHandlers };
