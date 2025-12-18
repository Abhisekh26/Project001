const express = require("express")
const bcrypt = require("bcrypt")
const users = require("../models/user")
const { Authuser } = require("../middlewares/userauth")
const profileauth = express.Router()

profileauth.get("/profile", Authuser, async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    }
    catch (err) {
        res.status(400).send("something went wronfhdhgg")
    }

})

profileauth.patch("/profile/edit", Authuser, async (req, res) => {
    try {
        const user = req.user
        const allowedupdate = ["firstName", "lastName", "age", "skills", "about", "photoURL"]
        const checkUpdate = Object.keys(req.body).every((key) => allowedupdate.includes(key))
        if (!checkUpdate) {
            res.send("enter valid data")
        } else {
            await users.findByIdAndUpdate({ _id: user._id }, req.body)
            res.send("user updated")
        }
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

profileauth.patch("/profile/changepassword", Authuser, async (req, res) => {
    try {
        const user = req.user
        const pass = req.body.password
      
        const hashed = await bcrypt.hash(pass,10)
        user.password= hashed
        await  user.save()
        res.send("done")
    }
    catch (err) {

    }
})


module.exports = profileauth