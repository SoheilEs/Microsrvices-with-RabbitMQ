const amqp = require("amqplib")

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
    let myChannel = await returnChannel()
    const queueDetail =  await myChannel.assertQueue(queueName,{durable:true})
    return {channel:myChannel, queueDetail}
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


module.exports = {
    connectToChannel,
    pushToQueue,
    returnChannel,
    createQueue
}