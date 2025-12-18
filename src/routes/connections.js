const connectionrequest = require("../models/connectionrequest")
const {Authuser} = require("../middlewares/userauth")
const express = require("express")
const connectionauth = express.Router()

connectionauth.post("/request/send/:status/:touser_id",Authuser,async(req,res)=>{
    try{
        const fromUser= req.user._id
        const toUser =req.params.touser_id
        const status = req.params.status

    const connection= new connectionrequest({
        fromuserid:fromUser,
        toUserid:toUser,
        status:status
    })

    await connection.save()
    res.send("Done")
    }catch(err){
        res.status(400).send("we will see")
    }

})

module.exports=connectionauth