const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const { registerGameHandlers } = require("./socket/gameHandlers");
const gameRoutes = require("./routes/gameRoutes");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// REST routes
app.use("/api/game", gameRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);
  registerGameHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
