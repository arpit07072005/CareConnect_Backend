import mongoose from "mongoose";

const OtpSchema= new mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    otpExpiration:{
        type:Date,
        default:Date.now,
        get:(otpExpiration)=>otpExpiration.getTime(),
        set:(otpExpiration)=>new Date(otpExpiration)
    }
},{timestamps:true})
const otp = mongoose.model("otp",OtpSchema)