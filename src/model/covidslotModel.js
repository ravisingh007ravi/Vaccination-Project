const mongoose = require('mongoose')

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
        slots : [{
            type : Date ,
            slots : [ String]
    }]   
    }
)
module.exports = mongoose.model("slot",slotSchema)