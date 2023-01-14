const express=require("express")
const {Notemodel}=require('../Models/notes.model')

const noteRouter=express.Router()


noteRouter.get("/",async(req,res)=>{
    try{
        const notes=await Notemodel.find()
        res.send({"msg":"Successful","notes":notes})
    }catch(err){
        console.log(err)
        res.send({"msg":"Failure"})
    }
})

noteRouter.post("/create",async(req,res)=>{
const payload=req.body
console.log(payload)
    try{
        const note=new Notemodel(payload)
        await note.save()
        res.send("Note created")
    }catch(err){
        console.log(err)
        res.send("Error in creating notes")
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await Notemodel.findOne({_id:id})
    const note_id=note.user_id
    const user_id=payload.user_id
    try{
        if(note_id!==user_id){
            res.send("You are not authorized")
        }else{
            await Notemodel.findByIdAndUpdate({_id:id},payload)
            res.send("Note updated")
        }
    }catch (err){
        console.log(err)
        res.send("Error to update note")
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await Notemodel.findOne({_id:id})
    const note_id=note.user_id
    const user_id=payload.user_id
    try{
        if(note_id!==user_id){
            res.send("You are not authorized")
        }else{
            await Notemodel.findByIdAndDelete({_id:id})
            res.send("Note deleted")
        }
    }catch (err){
        console.log(err)
        res.send("Error to delete note")
    }
})


module.exports={
    noteRouter
}