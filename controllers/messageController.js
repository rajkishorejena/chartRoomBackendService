const Message = require("../models/messageModel");

//Retrieving message from mongoDB
module.exports.getMessage = async (req, res, next) => {
  try {
    if (req.body) {
      const messages = await Message.find({
        roomId: req.body.roomId,
      });

      if (messages) return res.json(messages);
      else return res.jon({ statusMsg: "Failed to retrieve data" });
    } else {
      console.log("body can not be empty in getMessage");
    }
  } catch (ex) {
    next(ex);
  }
};

//Adding Message to the MongoDB
module.exports.addMessage = async (req, res, next) => {
  try {
    console.log("add msg", req.body);
    if (req.body) {
      const data = Message.create({
        emailId: req.body.emailId,
        roomId: req.body.roomId,
        message: req.body.message,
      });
      if (data) {
        return res
          .json({ statusMsg: "Message added successfully." })
          .status(200);
      } else
        return res.json({ statusMsg: "Failed to add message to the database" });
    } else {
      console.log("Body can not be empty in addMessage");
    }
  } catch (ex) {
    next(ex);
  }
};
