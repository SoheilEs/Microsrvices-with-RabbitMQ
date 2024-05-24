const amqp = require("amqplib");
const { OrderModel } = require("../models/order.models");

let channel;

const connectToChannel = async () =>{
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        return (await connection.createChannel())
    }catch(error){
        console.log("can't connect to channel");
    }
}

const returnChannel = async()=>{
    if(!channel){
        channel = await connectToChannel()
    }
    return channel
}
const createQueue = async(queueName)=>{
    const channel = await returnChannel()
    channel.assertQueue(queueName,{durable:true})
    return channel
}

const pushToQueue = async(queueName, data)=>{
    try{
        await returnChannel()
        await channel.assertQueue(queueName,{durable:true})
        return channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)),{persistent:true})
    }catch(error){
        console.log(error);
    }
}


const createOrderWithQueue = async(queueName)=>{
    try{
       await createQueue(queueName)
       channel.consume(queueName,async msg=>{
        if(msg.content){
            const {products, userEmail} = JSON.parse(msg.content.toString())
            const newOrder = await OrderModel({products,userEmail,totalPrice: (products.map(product=> +product.price)).reduce((prev,curr)=> prev + curr,0)})
            await newOrder.save()
            channel.ack(msg)
            pushToQueue("PRODUCT",newOrder)
        }
       })
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    connectToChannel,
    pushToQueue,
    returnChannel,
    createOrderWithQueue
}