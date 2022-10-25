const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3030",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  // console.log(`a user connected: ${socket.id}`);

  socket.on("send_msg", (data) => {
    socket.broadcast.emit("msg_received", data);
    // socket.emit("msg_received", data);
  });
  socket.on("typing", () => {
    // socket.broadcast.emit("msg_received", data);
    socket.broadcast.emit("typing");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
