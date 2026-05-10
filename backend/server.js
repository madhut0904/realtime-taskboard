const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const http = require("http");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/tasks",
  require("./routes/taskRoutes")
);

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});