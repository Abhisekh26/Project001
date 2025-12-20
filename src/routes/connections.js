const connectionrequest = require("../models/connectionrequest")
const Users = require("../models/user")
const { Authuser } = require("../middlewares/userauth")
const express = require("express")
const connectionauth = express.Router()

connectionauth.post("/request/send/:status/:touser_id", Authuser, async (req, res) => {
    try {
        const fromUser = req.user._id
        const toUser = req.params.touser_id
        const status = req.params.status

        if(fromUser == toUser){
            return res.send("invalid request")
        }

        const allowedStatus = ["interested", "ignore", "rejected", "accepted"]
        const checkStatus = allowedStatus.includes(status)
        if (!checkStatus) {
            return res.send("enter a vlaid request")
        }


        const toUserexist = await Users.findById(toUser)
        if (!toUserexist) {
            return res.send("oops")
        }

        const existIndb = await connectionrequest.findOne({
            $or:[{ fromuserid: fromUser, toUserid: toUser } ,{
                 fromuserid:toUser,toUserid:fromUser
            }]
        })
        if (existIndb) {
           return  res.send("this exists")
        }








        const connection = new connectionrequest({
            fromuserid: fromUser,
            toUserid: toUser,
            status: status
        })

        await connection.save()
        res.send("Done")
    } catch (err) {
        res.status(400).send("something went wrong ")
    }

})

module.exports = connectionauth