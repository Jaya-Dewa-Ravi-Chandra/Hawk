import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("signal", (data) => {
    socket.broadcast.emit("signal", data);
  });
});

server.listen(3000);
