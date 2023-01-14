const express=require("express")
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/notes.routes")
const {authenticate}=require('./middleware/authenticate.middleware')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(5000,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Error while conecting to database")
        console.log(err)
    }
    console.log("server started on port 5000")
})