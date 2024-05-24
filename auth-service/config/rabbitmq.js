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

const pushToQueue = async(queueName, data)=>{
    try{
        channel.assertQueue(queueName)
        return channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)))
    }catch(error){
        console.log(error);
    }
}


module.exports = {
    connectToChannel,
    pushToQueue,
    returnChannel
}