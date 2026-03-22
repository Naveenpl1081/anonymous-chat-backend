const { addToQueue, removeFromQueue, getPartner, endChat } = require("../utils/matchMaker");
const Message = require("../models/Message");

const lastMessageTime = {};  

module.exports = (io, socket) => {
  console.log("User connected:", socket.id);

  socket.on("start", () => {
    const partner = addToQueue(socket);
    if (partner) {
      socket.emit("connected");
      partner.emit("connected");
    } else {
      socket.emit("searching");
    }
  });

  socket.on("message", async (msg) => {
    if (!msg || msg.length > 200) return;

  
    const now = Date.now();
    if (lastMessageTime[socket.id] && now - lastMessageTime[socket.id] < 500) return;
    lastMessageTime[socket.id] = now;

    const partnerId = getPartner(socket.id);
    if (partnerId) {
      io.to(partnerId).emit("message", msg);
      await Message.create({
        senderId: socket.id,
        receiverId: partnerId,
        message: msg,
      });
    }
  });

  socket.on("skip", () => {
    const partnerId = endChat(socket.id);
    if (partnerId) {
      io.to(partnerId).emit("partner_disconnected");
    }
    socket.emit("searching");
    const newPartner = addToQueue(socket);
    if (newPartner) {
      socket.emit("connected");
      newPartner.emit("connected");
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    delete lastMessageTime[socket.id];   
    removeFromQueue(socket.id);
    const partnerId = endChat(socket.id);
    if (partnerId) {
      io.to(partnerId).emit("partner_disconnected");
    }
  });
};