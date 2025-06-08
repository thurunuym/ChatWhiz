import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app); //Socket.IO works on the raw HTTP server, not the Express app itself.

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; //to get the socket ID for a given user ID.
}

//used to store online users
const userSocketMap = {}; //This object maps each logged-in user ID to their socket connection ID.

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //This gets triggered whenever a new client connects to the Socket.IO server.
  //socket.id is the unique ID for this connection.

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
