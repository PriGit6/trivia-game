const { v4: uuidv4 } = require("uuid");

class Room {
  constructor(hostId, hostName) {
    this.id = uuidv4().slice(0, 6).toUpperCase();
    this.hostId = hostId;
    this.players = [{ id: hostId, name: hostName, score: 0 }];
    this.status = "waiting";
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.createdAt = Date.now();
  }

  addPlayer(id, name) {
    if (this.players.find((p) => p.id === id)) return false;
    this.players.push({ id, name, score: 0 });
    return true;
  }

  removePlayer(id) { this.players = this.players.filter((p) => p.id !== id); }

  getCurrentQuestion() { return this.questions[this.currentQuestionIndex] || null; }

  recordAnswer(playerId, answerIndex) {
    if (this.answers[playerId] !== undefined) return false;
    this.answers[playerId] = answerIndex;
    return true;
  }

  allAnswered() { return this.players.every((p) => this.answers[p.id] !== undefined); }

  scoreRound() {
    const question = this.getCurrentQuestion();
    if (!question) return;
    this.players.forEach((player) => {
      if (this.answers[player.id] === question.answer) player.score += 100;
    });
  }

  nextQuestion() {
    this.answers = {};
    this.currentQuestionIndex++;
    return this.currentQuestionIndex < this.questions.length;
  }

  getSafeQuestion() {
    const q = this.getCurrentQuestion();
    if (!q) return null;
    const { answer, ...safeQ } = q;
    return safeQ;
  }
}

module.exports = Room;
