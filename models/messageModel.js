const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  roomId: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Messages", MessageSchema);
