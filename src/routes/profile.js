const express = require("express")
const {Authuser} = require("../middlewares/userauth")
const profileauth = express.Router()

profileauth.get("/profile",Authuser,async (req,res)=>{
    try{
       const user = req.user
         res.send(user)
    }
    catch(err){
        res.status(400).send("something went wronfhdhgg")
    }

})

module.exports= profileauth