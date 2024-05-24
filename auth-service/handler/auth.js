const { UserModel } = require("../models/user.models")
const JWT = require("jsonwebtoken")
const authRouter = require("express").Router()


authRouter.post("/register",async(req,res,next)=>{
    try{
        const {name, email, password} = req.body
        const checkUser = await UserModel.findOne({email})
        if(checkUser) throw {message: "User already Exists!"}
        const user = await UserModel.create({name,email,password})
        return res.json(user)
    }catch(error){
        next(error)
    }

})
authRouter.post("/login",async(req,res,next)=>{
    try{
        const {email, password} = req.body
        const checkUser = await UserModel.findOne({email})
        if(!checkUser) throw {message: "User dosen't Exists!"}
        if(checkUser.password !== password) throw {massage:"Passwaord is incorret"}
        JWT.sign({email,id:checkUser._id,name:checkUser.name},"secretKey",(err,token)=>{
            if(!err) res.json({accessToken: token})
            return res.json({error: err.message})
        })
    }catch(error){
        next(error)
    }

})

module.exports = {
    authRouter
}