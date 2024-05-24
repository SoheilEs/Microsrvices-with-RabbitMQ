const { default: mongoose } = require("mongoose");
require("dotenv").config()
const { DB_URL } = process.env;
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return console.log("DB Already conncted");
    await mongoose.connect(DB_URL);

    process.on("SIGINT", async () => {
      console.log("\n db disconnected...");
      await mongoose.connection.close();
      process.exit(0);
    });
    console.log("connected to MongoDB......");
  } catch (error) {
    console.log(error?.message ?? "Failed DB Connection...");
  }
};

module.exports = {
    connectDB
}