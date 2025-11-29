const express = require('express')
const connectdb= require("./config/database")
const users = require("./models/user")
const app = express()                   //creates an instances of expree js application 
// const {Authuser}= require('./middlewares/userauth')
// app.use("/user",Authuser)
// app.get("/user/:userid",(req,res)=>{
//     console.log(req.params)
//     res.send("user 01 is logged")
// })
app.post("/signup",async(req,res)=>{
    const userobj ={
        firstName:"Rohit",
        lastName:"Sharma",
        emailId:"rohit@sharma.com",
        password:'rohit@123'
    }
// creating anew instance of user model 
try{
   const user = new users(userobj)
   await user.save()
    res.send("user added ")
}
catch(err){
    res.status(400).send("something went wrong")
} 
})

connectdb().then(()=>{
  console.log("connection established")
     app.listen(3000,()=>{
    console.log("server has started")
})
}).catch((err)=>{
    console.log("error happened")
})



