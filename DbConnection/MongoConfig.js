const mongoose = require("mongoose");
const DB_URL = process.env.MONGODB_URL;
const MongoConfig = async () => {
  try {
    mongoose.connect(DB_URL);
    console.log("Database connection Successful");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = MongoConfig;
