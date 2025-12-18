const express = require('express')
const connectdb = require("./config/database")
const users = require("./models/user")
const bcrypt = require("bcrypt")
const {Authuser}= require("./middlewares/userauth")
var cookieParser = require("cookie-parser")
var jwt = require('jsonwebtoken');
const authRouter = require("./routes/auth")
const profileauth= require("./routes/profile")
const connectionauth = require("./routes/connections")
const {signuphelper} = require("./utils/signuphelper")
const app = express()
app.use(express.json())
app.use(cookieParser())
//creates an instances of expree js application 
// const {Authuser}= require('./middlewares/userauth')
// app.use("/user",Authuser)
// app.get("/user/:userid",(req,res)=>{
//     console.log(req.params)
//     res.send("user 01 is logged")
// })




// app.post("/signup", async (req, res) => {
//      try {
//          signuphelper(req)
//          const{firstName,lastName,emailId,password} = req.body 
//          const passwordhash = await bcrypt.hash(password,10)
//         const user = new users({
//             firstName,lastName,emailId,password:passwordhash,
//         })
//         await user.save()
//         res.send("user added ")
//     }
//     catch (err) {
//         res.status(400).send(err)
//     }
// })

// app.post("/login", async(req,res)=>{
//     try{
//       const {emailId,password }= req.body
//      const user = await users.findOne({emailId: emailId})
//      if(!user){
//         throw Error("Enter valid credentials")
//      }
//      else{
//         const checkPassword = await bcrypt.compare(password,user.password)
//         if(checkPassword){
//             // var secretToken =await jwt.sign({_id:user._id},"ABHI@JIMMY$2614")
//             var secretToken= await user.getJWT()
//              res.cookie("token",secretToken)
//             res.send(user)
//         }
//         else{
//             res.send("enter valid credentials")
//         }
//      }
//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
   
// })



app.use("/",authRouter)
app.use("/",profileauth)
app.use("/",connectionauth)

// app.get("/user", async (req, res) => {
//     const email = req.body.emailId
//     try {
//         const user = await users.findOne({ emailId: email })
//         if (user) {
//             res.send(user)
//         }
//         else {
//             res.send("no user")
//         }
//     }
//     catch (err) {
//         res.status(400).send("something went wrong")
//     }
// })

// app.delete("/user", async (req, res) => {
//     const id = req.body._id
//     try {
//         const user = await users.findByIdAndDelete(id)
//         if (user) {
//             res.send("user deleted")
//         }
//         else {
//             res.send("no user exist ")
//         }
//     }
//     catch (err) {
//         res.status(400).send("something went wrong")
//     }
// })

//    app.patch("/user", async (req, res) => {
//     const email = req.body.emailId
//     try {
//         const allowed = ["firstName", "lastName", "skills", "about"]
//         const isupdateAllowed = Object.keys(req.body).every((keys) => allowed.includes(keys))
//         if (!isupdateAllowed) {
//             throw Error("update not allowed")
//         }
//         await users.findOneAndUpdate({ emailId: email }, req.body, { runValidators: true, new: true })
//         res.send("user updated")
//     }
//     catch (err) {
//         res.status(400).send(err.message)
//     }
// })


// app.get("/profile",Authuser,async (req,res)=>{
//     try{
//      const user = req.user
//         res.send(user)
//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
   
// })

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



