const { createOrderWithQueue } = require("./config/rabbitmq")
const { connectDB } = require("./config/connectDB")

require("dotenv").config()
connectDB()
createOrderWithQueue("ORDER")

