const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Message = sequelize.define("Message", {
  senderId: {
    type: DataTypes.STRING,
  },
  receiverId: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
});

module.exports = Message;