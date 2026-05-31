const questions = [
  { id: 1, question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperText and links Markup Language", "None of the above"], answer: 0, timeLimit: 20 },
  { id: 2, question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], answer: 3, timeLimit: 20 },
  { id: 3, question: "What does CSS stand for?", options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"], answer: 1, timeLimit: 20 },
  { id: 4, question: "Which HTTP method is used to send data to a server?", options: ["GET", "PUT", "POST", "SEND"], answer: 2, timeLimit: 20 },
  { id: 5, question: "What is React?", options: ["A database", "A JavaScript library for building UIs", "A backend framework", "A CSS preprocessor"], answer: 1, timeLimit: 20 },
  { id: 6, question: "What does API stand for?", options: ["Applied Programming Interface", "Application Programming Interface", "Application Protocol Interface", "Applied Protocol Integration"], answer: 1, timeLimit: 20 },
  { id: 7, question: "Which of these is NOT a JavaScript framework?", options: ["Vue", "Angular", "Django", "Svelte"], answer: 2, timeLimit: 20 },
  { id: 8, question: "What does JSON stand for?", options: ["JavaScript Object Notation", "JavaScript Oriented Notation", "Java Standard Object Naming", "JavaScript Open Notation"], answer: 0, timeLimit: 20 },
];

const getRandomQuestions = (count = 5) =>
  [...questions].sort(() => Math.random() - 0.5).slice(0, Math.min(count, questions.length));

module.exports = { questions, getRandomQuestions };
