const mongoose = require("mongoose")
const connectionrequestschema = new mongoose.Schema({
    fromuserid:{
        type: mongoose.Schema.Types.ObjectId ,
        required:true
    },
    toUserid:{
         type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("ConnectionRequest",connectionrequestschema)