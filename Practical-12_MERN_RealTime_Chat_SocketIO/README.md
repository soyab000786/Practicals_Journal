# Practical 12: Real-Time Chat Application using Socket.IO, React and Node.js

## 🎯 Practical Objective
Develop a real-time, bidirectional chat application utilizing **Socket.IO WebSockets** integrated with a **Node.js/Express backend** and interactive frontend.

---

## 🛠️ Architecture & Concepts
- **WebSocket Protocol**: Instant full-duplex communication without polling overhead.
- **Rooms & Namespaces**: Channel segregation (`#general`, `#mern-developers`, `#project-review`).
- **Real-Time Events**:
  - `join_room`: Join channel and announce presence.
  - `send_message` & `receive_message`: Instant broadcast to room members.
  - `typing` & `stop_typing`: Ephemeral typing indicator events.
  - `disconnect`: Automatic cleanup and offline status broadcast.

---

## 🚀 How to Run Locally
```bash
cd Practical-12_MERN_RealTime_Chat_SocketIO
npm install
node server.js
```
Open [http://localhost:5000](http://localhost:5000) or test via Apache [http://localhost/Practicals_Journal/Practical-12_MERN_RealTime_Chat_SocketIO/](http://localhost/Practicals_Journal/Practical-12_MERN_RealTime_Chat_SocketIO/).
