const JWT = require("jsonwebtoken")


const isAuthenticated = async(req,res,next)=>{
    try{    
        const token = req.headers?.["authorization"]?.split(" ")[1]
        JWT.verify(token,"secretKey",(err, payload)=>{
            if(err) return res.json({error: err.message})
                req.user = payload
                next()
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    isAuthenticated
}