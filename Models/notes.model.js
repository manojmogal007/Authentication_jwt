const mongoose=require('mongoose')

const noteschema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    author:String,
    user_id:String
})


const Notemodel=mongoose.model("note",noteschema)

module.exports={
    Notemodel
}