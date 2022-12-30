const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : [ true , "firstName is mandatory"],
        },
        lastName : {
            type : String,
            required : [ true , "lastName  is mandatory"],
        },
        PhoneNumber : {
            type : String,
            required : [ true , "PhoneNumber name is mandatory"],
        },
        Age : {
            type : Number,
            required : [ true , "Age is mandatory"],
        },
        PinCode : {
            type : Number,
            required : [ true , "PinCode is mandatory"],
        },
        FirstDose : {
            type: String,
            default: "pending",
            enum: ["pending", "completed"],
            select : false
        },
        SecondDose :{
            type: String,
            default: "pending",
            enum: ["pending", "completed"], 
            select : false
        },
        VaccinationStatus : {
            type: String,
            default: "pending",
            enum: ["pending", "completed"]
        },
        Aadhar_No : {
            type : Number,
            required : [ true , "Aadhar No number is mandatory"],
        }
    }, { timestamps: true }
)
module.exports = mongoose.model("userModel",UserSchema)

