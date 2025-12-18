const express = require("express")
const authRouter = express.Router()
var jwt = require('jsonwebtoken');
const {signuphelper} = require("../utils/signuphelper")
const bcrypt = require("bcrypt")
const users = require("../models/user")
const { JsonWebTokenError } = require("jsonwebtoken")


authRouter.post("/signup",async (req,res)=>{
     try {
         signuphelper(req)
         const{firstName,lastName,emailId,password} = req.body 
         const passwordhash = await bcrypt.hash(password,10)
        const user = new users({
            firstName,lastName,emailId,password:passwordhash,
        })
        await user.save()
        res.send("user added ")
    }
    catch (err) {
        res.status(400).send(err)
    }
})


authRouter.post("/login",async (req,res)=>{
    try{
    const {emailId,password}= req.body
    const user = await users.findOne({emailId:emailId})
    if(!user){
      res.status(400).send("enter valid credentials")
    }
    else {
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            res.send("Enter valid credentials")
        }
        else {
            const token = await jwt.sign({_id:user._id},"ABHIJIMMY2614")
            res.cookie("token",token)
            res.send(user)
        }
    }
}
catch(err){
    err.status(400).send("enter valid credentials")
}
})


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("user logged out")
})



module.exports=authRouter