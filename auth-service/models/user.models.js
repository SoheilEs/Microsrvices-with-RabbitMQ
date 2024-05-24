const { Schema, models, model} = require("mongoose");

const userSchema = new Schema({
    name:{type:String},
    email:{type: String},
    password:{type: String}
},{
    versionKey:false,
    timestamps:true
})

const UserModel = models.User || model("User",userSchema)

module.exports = {
    UserModel
}