const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const messageRoutes = require("./router/messages");
const connectMongoDB = require("./service/mongoDbConnect");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

//Connect to Database..
connectMongoDB();

//Add router..
app.use("/api/v1/message", messageRoutes);

//create a socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("data", data);
    socket.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
