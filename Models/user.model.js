
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
})

const Usermodel=mongoose.model("users",userSchema)

module.exports={
    Usermodel
}