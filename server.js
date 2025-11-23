const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// health check endpoint
app.get("/", (req, res) => {
  res.send("Signaling server running");
});

// socket events
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("signal", (data) => {
    socket.broadcast.emit("signal", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Render injects PORT
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
