const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    if(token){
        const decode=jwt.verify(token,'masai')
        // console.log(decode)
        if(decode){
            const user_id=decode.user_id
            req.body.user_id=user_id
            next()
        }else{
            res.send("Please login first")
        }
    }else{
        res.send("Please login first")
    }
}


module.exports={
    authenticate
}