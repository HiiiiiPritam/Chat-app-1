import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

///realtime message code goes here

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};
const groups = {};

io.on("connection", (socket) => {
  console.log("User is connected🤑 with ID: ", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log(users);
  }

  // socket.on("joinGroup", ({ groupId }) => {
  //   socket.join(groupId);

  //   // Add user to the group
  //   if (!groups[groupId]) {
  //     groups[groupId] = [];
  //   }
  //   if (!groups[groupId].includes(userId)) {
  //     groups[groupId].push(userId);
  //   }

  //   console.log(`${userId} joined group ${groupId}`);
  // });

  // socket.on('joinRoom', ({ conversationId, members }) => {
  //   // Join all members to the room, except the current user
  //   members.forEach(member => {
  //     socket.to(member._id).join(conversationId);
  //     console.log(`Users ${member._id} joined room: ${conversationId}`);
  //   });
    
  // });

  // socket.on("sendMessageToGroup", ({ groupId, message, userId }) => {
  //   if (groups[groupId] && groups[groupId].includes(userId)) {
  //     const newMessage = {
  //       senderId: userId,
  //       message,
  //       groupId,
  //     };

  //     // Save message to DB logic here (omitted for brevity)

  //     // Broadcast message to everyone in the group
  //     io.to(groupId).emit("groupMessage", newMessage);
  //   }
  // });

  // socket.on("leaveGroup", ({ userId, groupId }) => {
  //   socket.leave(groupId);

  //   // Remove user from the group
  //   if (groups[groupId]) {
  //     groups[groupId] = groups[groupId].filter((id) => id !== userId);
  //     if (groups[groupId].length === 0) {
  //       delete groups[groupId];
  //     }
  //   }

  //   console.log(`${userId} left group ${groupId}`);
  // });

  socket.on('joinRoom', ({ conversationId, members }) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room: ${conversationId}`);

      if (!groups[conversationId]) {
      groups[conversationId] = [];
    }
    if (!groups[conversationId].includes(userId)) {
      groups[conversationId].push(userId);
    }

    groups
  });

  socket.on('leaveRoom', ({ conversationId }) => {
    socket.leave(conversationId);
    console.log(`User ${socket.id} left room: ${conversationId}`);
  });

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User is disconnected❌ with ID: ", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
