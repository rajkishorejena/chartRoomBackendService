const mongoose = require("mongoose");

const url = process.env.MONGO_DB_URL;

const connectToMongoDB = async () => {
  if (url) {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to mongoDB");
      })
      .catch((err) => {
        console.log("could not connect to mongo db", err);
      });
  } else {
    console.log("please provide mongo db url");
  }
};

module.exports = connectToMongoDB;
