const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const slotSchema = new mongoose.Schema(
    {
        Date : {
            type : Date,
            require : [true, "please provide the date"]
        },
        Hospital : {
            type : String,
            require : [true, "please provide the Hospital Name"] 
        },
        PinCode : {
            type : Number,
            require : [true, "please provide the PinCode"]
        },
        slots : [{
            slotsTime : { type : String},
            patients : [{ type : ObjectId , ref : "userModel"}],
            slotsBooked : { type : Number , default : 0}
    }],   
 
    }
)
module.exports = mongoose.model("slot",slotSchema)