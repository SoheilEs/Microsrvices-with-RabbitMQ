const express = require("express")
const { productRouter } = require("./handler/product")
const app = express()
require("dotenv").config()
const {APP_PORT} = process.env
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/product",productRouter)
app.use((req,res)=>{
    return res.json({
        error : "NotFound"
    })
})
app.use((error,req,res,next)=>{
    return res.json({
        error : error.message
    })
})
app.listen(APP_PORT,()=>{
    console.log("Auth-Service running on http://localhost:4000");
})
