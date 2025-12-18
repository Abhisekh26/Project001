const jwt = require("jsonwebtoken")
const users = require("../models/user")

async function Authuser(req,res,next){

try{
    const token = req.cookies.token
    const istokenValid = await jwt.verify(token,"ABHIJIMMY2614")
    if(!istokenValid){
        res.send("Log in again")
    }
    if(istokenValid){
        const user = await users.findById(istokenValid)
        if(!user){
            res.send("Login again")
        }
        else{
            req.user =user
          
        }
          next()
    }
}
catch(err){
    res.status(400).send("something wedfnt wrong")
}


}
module.exports={
    Authuser
}