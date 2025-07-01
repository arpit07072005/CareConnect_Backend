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
    
   },
   service:{
     type:String,
     required:true,
     trim:true
   },
   address:{
    type:String,
    required:true,
  },
   completedBookings: [
  {
    caregiverName: String,
    caregiverEmail: String,
    caregiverImage: String,
    caregiverAadhar:String,
    caregiverPhone: String,
    paymentId: String,
    completedAt: { type: Date, default: Date.now }
  }
],
feedback: [
  {
    Rating: { type: String },  // or Number
    Review: { type: String },
    completedAt: { type: Date }
  }
]
},{timestamps:true})
 export const client = mongoose.model("client",ClientSchema)