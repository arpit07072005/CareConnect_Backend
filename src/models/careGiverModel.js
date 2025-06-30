import mongoose, {Schema} from "mongoose";

const careGiverSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true,"full name is required"],
        index:true,
        trim: true
    },
    dateOfBirth:{
        type: Date,
        required:[true,"date of birth is required"]
    },
    mobileNumber:{
        type: String,
        required: [true,"mobile number is required"],
    },
    email:{
        type: String,
        required: [true,"email is required"],
        unique:true,
        lowercase: true,
        trim: true
    },
    careGiverImage:{
        type: String,
        required:[true,"image is required"]
    },
    address:{
        type: String,
        required:[true,"address is required"]
    },
    aadharImage:{
        type: String,
        required:[true,"aadhar is required"]
    },
    fieldOfExpertise: {
        type: String,
        required: [true, "Field of expertise is required"]
      },
      yearsOfExpertise: {
        type: String,
        required: [true, "Years of expertise is required"],
        min: 0
      },
      qualifications: {
        type: String,
        required: [true, "Qualifications are required"],
        trim: true
      },
      preferredWorkSchedule: {
        // fullTime: { type: Boolean, default: false },
        // partTime: { type: Boolean, default: false },
        // flexibleHours: { type: Boolean, default: false },
        // weekendsOnly: { type: Boolean, default: false }
        type: String,
        required: [true, "Schedule is required"]
      },
      languageSpoken:{
        type: String,
        required: [true, "Must mention atleast one language"]
      },
      drivingLicence: {
         type: Boolean, 
         default: false ,
         required: [true, "Must mention atleast one language"]
        },
      completedBookings: [
  {
    clientName: String,
    clientEmail: String,
    clientAddress: String,
    clientPhone: String,
    paymentId: String,
    completedAt: { type: Date, default: Date.now }
  }
],

    },
    { timestamps: true }
)

export const CareGiver= mongoose.model("CareGiver", careGiverSchema)