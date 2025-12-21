const mongoose = require("mongoose")
const connectionrequestschema = new mongoose.Schema({
    fromuserid:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Users",
        required:true
    },
    toUserid:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"Users",
         required:true
    },

    status:{
        type:String,
        enum:{
            values:["interested","ignore","rejected","accepted"]
        },
        required:true
    }

},{
    timestamps:true
})

connectionrequestschema.index({fromuserid:1, toUserid:1})

module.exports = mongoose.model("ConnectionRequest",connectionrequestschema)