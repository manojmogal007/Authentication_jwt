const express=require('express')
const {Usermodel}=require("../Models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');


const userRouter=express.Router()

userRouter.get("/",(req,res)=>{
    res.send("Welcome")
})
userRouter.post("/signup",async(req,res)=>{
    const {name,email,password,age}=req.body
    try{
        bcrypt.hash(password, 6, async (err, encrypted_pass)=>{
            if(err){
                console.log(err)
                res.send("something went wrong")
            }else{
                const user=new Usermodel({name,email,password:encrypted_pass,age})
                await user.save()
                res.send("Registered")
            }
        });
        
    }catch (err){
        console.log("Error while registering")
        console.log(err)
        res.send("Error while registering")
    }
    
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Usermodel.find({email})

        if(user.length>0){
             bcrypt.compare(password, user[0].password, (err, result)=> {
            if(result){
                const token = jwt.sign({ user_id: user[0]._id }, 'masai');
                res.send({"msg":"Login successful","token":token})
            }else{
                res.send({'msg':"Wrong credentials"})
            }
            });
        }else{
            res.send({'msg':"Wrong credentials"})
        }
    }catch (err){
        console.log(err)
        res.send("Error while logging in")
    }
})

userRouter.get("/cart",async(req,res)=>{
    const token=req.headers.authorization
    jwt.verify(token, 'masai', (err, decoded) => {
        if(err){
            res.send("Invalid token")
            console.log(err)
        }else{
            res.send("Cart page")
        }
      });
})
userRouter.get("/data",async(req,res)=>{
    const token=req.headers.authorization
    jwt.verify(token, 'masai', (err, decoded) => {
        if(err){
            res.send("Invalid token")
            console.log(err)
        }else{
            res.send("Data page")
        }
      });
})

module.exports={
    userRouter
}