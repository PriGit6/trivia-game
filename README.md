# 🎮 Trivia Battle — Real-Time Multiplayer Trivia Game

A full-stack multiplayer trivia game built with React, Node.js, and Socket.io.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Real-Time**: Socket.io (WebSockets)

## Getting Started

### 1. Start the server
```bash
cd server
npm install
npm run dev
```

### 2. Start the client
```bash
cd client
npm install
npm run dev
```

### 3. Play!
- Open http://localhost:5173
- Create a room, share the code with friends
- Host clicks "Start Game"
- Answer questions before the timer runs out!

## Project Structure
```
trivia-game/
├── server/          # Node.js + Express + Socket.io
│   └── src/
│       ├── index.js            # Entry point
│       ├── config/questions.js # Question bank
│       ├── models/Room.js      # Room game state
│       ├── controllers/        # Room store
│       ├── socket/             # Socket event handlers
│       └── routes/             # REST endpoints
└── client/          # React + Vite
    └── src/
        ├── App.jsx
        ├── context/GameContext.jsx   # Global state + socket events
        ├── utils/socket.js           # Socket.io client
        ├── pages/                    # LobbyPage, GamePage, ResultsPage
        └── components/
            ├── lobby/   # JoinCreate, WaitingRoom
            └── game/    # QuestionCard, Timer, Scoreboard
```

## Features
- Create/join rooms with a 6-character code
- Real-time synced questions and countdown timer
- Live scoreboard updates as players answer
- Auto-advance after all players answer or timer expires
- Final results screen with rankings
