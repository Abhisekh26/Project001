const jwt = require("jsonwebtoken")
const users = require("../models/user")

async function Authuser(req,res,next){

    try{
    const token = req.cookies.token
    const isTokenvalid = await jwt.verify(token,"ABHI@JIMMY$2614")
    if(!isTokenvalid){
        res.send("login again")
    }
    const user = await users.findById(isTokenvalid)
    if(!user){
        res.send("oops something went wrong")
    }
    else{
        req.user = user
    }
     next()
}
catch(Err){
    res.status(400).send("oops")
}
}
module.exports={
    Authuser
}