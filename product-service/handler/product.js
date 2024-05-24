const { isAuthenticated } = require("../../isAuthenticated")
const { pushToQueue, createQueue } = require("../config/rabbitmq")
const { ProductModel } = require("../models/product.models")
const productRouter = require("express").Router()



productRouter.post("/create",async(req,res,next)=>{
    try{
        const {title, description, price} = req.body
        const newProduct = await ProductModel.create({title, description, price})
        return res.json(newProduct)
    }catch(error){
        next(error)
    }
})

productRouter.post("/buy",isAuthenticated,async(req,res,next)=>{
    try{

        const {productIds = []} = req.body
        const products = await ProductModel.find({_id:{$in:productIds}})
        if(!products.length) throw({message:"Products dosen't exist!"})
        const {email} = req.user
        await pushToQueue("ORDER",{products, userEmail :email})
        const {channel, queueDetail} = await createQueue("PRODUCT")
        channel.consume("PRODUCT",msg=>{
            channel.ack(msg)
            
        })
        return res.json({
            message:"Product successfully added to order list",
        })
    }catch(error){
        next(error)
    }
})

module.exports = {
    productRouter
}