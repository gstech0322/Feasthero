const mongoose = require("mongoose");

const { settings } = require('../feasthero/settings');

function connectToDb() {
  console.log(settings.MONGO_URI)
  mongoose.connect(settings.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
}

function close() {
  mongoose.connection.close();
}

module.exports = { connectToDb, close };
