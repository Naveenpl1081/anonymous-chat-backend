const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const { connectDB, sequelize } = require("./config/db");
const chatHandler = require("./socket/chatHandler");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


io.on("connection", (socket) => {
  chatHandler(io, socket);
});

const PORT=process.env.PORT

const startServer = async () => {
  await connectDB();
  await sequelize.sync();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();