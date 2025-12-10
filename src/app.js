const express = require('express')
const connectdb = require("./config/database")
const users = require("./models/user")
const app = express()
app.use(express.json())
//creates an instances of expree js application 
// const {Authuser}= require('./middlewares/userauth')
// app.use("/user",Authuser)
// app.get("/user/:userid",(req,res)=>{
//     console.log(req.params)
//     res.send("user 01 is logged")
// })
app.post("/signup", async (req, res) => {
    // console.log(req.body)
    // const userobj ={
    //     firstName:"Rohit",
    //     lastName:"Sharma",
    //     emailId:"rohit@sharma.com",
    //     password:'rohit@123'
    // }
    // creating anew instance of user model 
    try {
        const user = new users(req.body)
        await user.save()
        res.send("user added ")
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

app.get("/user",async (req,res)=>{
    const email = req.body.emailId
    // console.log(email)
    try{
        const user = await users.findOne({emailId :email})
        // console.log(user)
       if(user){
        res.send(user)
       }
       else{
        res.send("no user")
       }
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})

app.delete("/user",async(req,res)=>{
    const id = req.body._id
    try{
        const user = await users.findByIdAndDelete(id)
        if(user){
            res.send("user deleted")
        }
        else {
            res.send("no user exist ")
        }
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})

app.patch("/user",async(req,res)=>{
    const email = req.body.emailId
    try{
        await users.findOneAndUpdate({emailId:email},req.body)
        res.send("user updated")
    }
    catch(err){

    }
})

app.get("/feed", async (req, res) => {

    try {
        const user = await users.find({})
        res.send(user)
    }
    catch (err) {
        res.status(400).send("something went wrong")

    }

})








connectdb().then(() => {
    console.log("connection established")
    app.listen(3000, () => {
        console.log("server has started")
    })
}).catch((err) => {
    console.log("error happened")
})



