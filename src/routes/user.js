const express = require("express")
const userRouter = express.Router()
const connectionrequest = require("../models/connectionrequest")
const {Authuser} = require("../middlewares/userauth")

//get pending friend request of logged in user 

userRouter.get("/user/friendrequests",Authuser,async(req,res)=>{
try{
const loggedinuser = req.user
console.log(loggedinuser._id)
const allRequest = await connectionrequest.find({toUserid:loggedinuser._id,status:"interested",}).populate("fromuserid",["firstName","lastName"])
console.log(allRequest)
res.send(allRequest)
}
catch(err){
    res.status(400).send("something went wrong")
}

})

//api to get all friend list 

userRouter.get("/user/allfriend",Authuser,async(req,res)=>{
    try{
   const user = req.user 
   const userdata = await connectionrequest.find({
     status: "accepted",$or:
    [
    {fromuserid:user._id},
    {toUserid:user._id},
  
   ]
}).populate("fromuserid",["firstName","lastName"])
.populate("toUserid",["firstName","lastName"])

// console.log(userdata)

const friends = userdata.map(conn => {
  if (conn.fromuserid._id.toString() === user._id.toString()) {
    return conn.toUserid
  } else {
    return conn.fromuserid
  }
})
res.send(friends)
console.log(friends)


    }


    catch(Err){
        res.status(400).send("something went wrong")
    }
})

module.exports= userRouter