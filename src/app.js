const express = require('express')
const app = express()                   //creates an instances of expree js application 
app.use((req,res)=>{
    res.send("Hello from the server")
})

app.listen(3000,()=>{
    console.log("server has started")
})
