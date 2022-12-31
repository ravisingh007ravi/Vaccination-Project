const mongoose = require("mongoose");
const Validations = require('../Validation/validation')

const UserSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : [ true , "firstName is mandatory"],
            trim : true,
            validate : [Validations.isValidName, "please provide a valid firstName" ]
        },
        lastName : {
            type : String,
            required : [ true , "lastName  is mandatory"],
            trim : true,
            validate : [Validations.isValidName, "please provide a valid lastName" ]
        },
        PhoneNumber : {
            type : String,
            required : [ true , "PhoneNumber name is mandatory"],
            trim : true,
            unique : true,
            validate : [Validations.isValidMobile, "please provide a valid lastName" ] 
        },
        Age : {
            type : Number,
            required : [ true , "Age is mandatory"],
            trim : true,
        },
        password : {
            type : String,
            required : [ true , "PinCode is mandatory"],
        },
        PinCode : {
            type : Number,
            required : [ true , "PinCode is mandatory"],
            trim : true,
            validate : [Validations.isValidPincode, "please provide a valid lastName" ]
        },
        SlotStatus :{
            type : String,
            default: "pending",
            enum: {
                values: ["pending", "completed"],
                default : "pending",
                message: "Please enter correct SlotStatus",
              },
        },
        FirstDose : {
            type: String,
            default : "pending",
            enum: {
                values: ["pending", "completed"],
                message: "Please enter correct status",
              },
            select : false
        },
        SecondDose :{
            type: String,
            default: "pending",
            enum: {
                values: ["pending", "completed"],
                message: "Please enter correct status",
              },
            select : false
        },
        VaccinationStatus : {
            type: String,
            default: "pending",
            enum: {
                values: ["pending", "completed"],
                message: "Please enter correct status",
              },
        },
        Aadhar_No : {
            type : Number,
            required : [ true , "Aadhar No number is mandatory"],
        }
    }, { timestamps: true }
)
module.exports = mongoose.model("userModel",UserSchema)

