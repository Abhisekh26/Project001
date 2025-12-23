const express = require("express")
const userRouter = express.Router()
const connectionrequest = require("../models/connectionrequest")
const users= require("../models/user")
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


userRouter.get("/feed",Authuser,async(req,res)=>{
  const user = req.user 
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10 
  limit = limit > 50 ?50 :limit;
  const skip = (page-1) * limit;
  const data = await connectionrequest.find({$or:[
    {fromuserid:user._id},{toUserid:user._id}
  ]}).select("fromuserid toUserid")
 

  const hideFromUser = new Set()
  data.forEach((key)=>{
   
 hideFromUser.add(key.fromuserid.toString())
  hideFromUser.add(key.toUserid.toString())

  })
  // console.log(hideFromUser)
 const hideData= Array.from(hideFromUser)
const alluser = await users.find({_id:{$nin:hideData}}).select("firstName LastName").skip(skip).limit(limit)
console.log(alluser)
res.send(data)
})

module.exports= userRouter