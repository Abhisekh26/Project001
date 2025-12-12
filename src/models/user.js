const mongoose = require("mongoose")
const { Schema } = mongoose
const validator = require ("validator")
const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,             //makes mandatory for user to enater emailid 
        unique: true,       //makes sure every user enters a unique email id 
        trim: true,             // trims the user email id from both side 
        immutable:true,    //doesnt allow user to update email id
      validate: function (value){
        if(!validator.isEmail('value')){
            throw Error("enter valid email id ")
        }
      }           
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    age: {
        type: Number,
       validate: function (age){
        if(age<18){
            throw Error("too young for this platform")
        }
       }
    },

    gender: {
        type: String,
        trim: true,
        enum: ["male", "female", "others"]
    },

    skills: {
        type: [String],
        validate: function (skills){
            if(skills.length>10){
                throw Error("please select only 10 skills")
            }
        }
    },
    photoURL: {
        type: String
    },
    about: {
        type: String,
        default: "Welcome to my profile"

    }

}, { timestamps: true })

module.exports = mongoose.model("Users", userSchema)