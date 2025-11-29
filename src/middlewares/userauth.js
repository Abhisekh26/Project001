function Authuser(req,res,next){
    const token = true 
    const isuserAuth =  true 
    if(token == isuserAuth){
        next()
    }
    else{
        res.status(400).send("user not authorised")
    }
}
module.exports={
    Authuser
}