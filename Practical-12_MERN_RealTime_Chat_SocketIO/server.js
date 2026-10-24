const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname)));

// Connected Users map: socketId -> { username, room }
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log(`[Socket Connected]: ${socket.id}`);

  // User Joins a Chat Room
  socket.on('join_room', ({ username, room }) => {
    socket.join(room);
    activeUsers.set(socket.id, { username, room });

    // Welcome message to user
    socket.emit('receive_message', {
      sender: 'System Bot',
      text: `Welcome to #${room}, ${username}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      system: true
    });

    // Broadcast to room members
    socket.to(room).emit('receive_message', {
      sender: 'System Bot',
      text: `${username} joined the room.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      system: true
    });

    // Update active user list for room
    const roomUsers = Array.from(activeUsers.values()).filter(u => u.room === room).map(u => u.username);
    io.to(room).emit('room_users', roomUsers);
  });

  // Handle Incoming Message
  socket.on('send_message', (data) => {
    const user = activeUsers.get(socket.id);
    const room = user ? user.room : data.room;

    const messagePayload = {
      sender: data.sender || (user ? user.username : 'Anonymous'),
      text: data.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      system: false
    };

    io.to(room).emit('receive_message', messagePayload);
  });

  // Handle Typing indicator
  socket.on('typing', ({ username, room }) => {
    socket.to(room).emit('user_typing', { username });
  });

  socket.on('stop_typing', ({ room }) => {
    socket.to(room).emit('user_stop_typing');
  });

  // Disconnection handler
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      io.to(user.room).emit('receive_message', {
        sender: 'System Bot',
        text: `${user.username} left the chat.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        system: true
      });
      activeUsers.delete(socket.id);
      const roomUsers = Array.from(activeUsers.values()).filter(u => u.room === user.room).map(u => u.username);
      io.to(user.room).emit('room_users', roomUsers);
    }
    console.log(`[Socket Disconnected]: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Practical 12: Real-Time Socket.IO Chat Server`);
  console.log(` Server URL: http://localhost:${PORT}`);
  console.log(` Student: Saiyad Soyab | Enrollment: 26084231040`);
  console.log(`=======================================================`);
});

module.exports = { app, server };
