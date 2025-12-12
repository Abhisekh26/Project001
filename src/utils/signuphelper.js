const validator = require ("validator")

function signuphelper(req){
const {firstName,lastName,emailId} = req.body
if(!firstName || !lastName){
    throw new Error("enter your firstname")
}
if(!validator.isEmail(emailId)){
    throw new Error("enter a valid emailid")
}
}

module.exports={
    signuphelper
}