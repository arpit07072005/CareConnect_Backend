import mongoose from "mongoose";
const ClientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
   },
   phoneNumber:{
    type:String,
    required:true,
    unique:true
   },
   service:{
     type:String,
     required:true,
     trim:true
   },
   address:{
    type:String,
    required:true,
    unique:true
   }
},{timestamps:true})
 export const client = mongoose.model("client",ClientSchema)