let waitingUsers = [];
let activeChats = {};

const addToQueue = (socket) => {
  if (waitingUsers.length > 0) {
    const partner = waitingUsers.shift();
    activeChats[socket.id] = partner.id;
    activeChats[partner.id] = socket.id;
    return partner;
  } else {
    waitingUsers.push(socket);
    return null;
  }
};

const removeFromQueue = (socketId) => {
  waitingUsers = waitingUsers.filter((s) => s.id !== socketId);
};

const getPartner = (socketId) => {
  return activeChats[socketId];
};

const endChat = (socketId) => {
  const partner = activeChats[socketId];
  if (!partner) return null; 
  delete activeChats[socketId];
  delete activeChats[partner];
  return partner;
};

module.exports = { addToQueue, removeFromQueue, getPartner, endChat };
