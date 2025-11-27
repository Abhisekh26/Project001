const express = require('express')
const app = express()                   //creates an instances of expree js application 


app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({firstName:"abhisekh",lastName:"singh"})
})
app.post("/user",(req,res)=>{
    console.log("successfully posted")
    res.send("user details posted again")
})

app.delete("/user",(req,res)=>{
    console.log("deleted successfully")
    res.send("deleted")
})

app.use("/",(req,res)=>{
    res.send("homepage")
})
app.listen(3000,()=>{
    console.log("server has started")
})
