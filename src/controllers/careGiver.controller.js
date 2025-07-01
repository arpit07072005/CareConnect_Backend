import { asyncHandler } from "../utils/asyncHandle.js"
import {ApiError} from "../utils/ApiError.js"
import { CareGiver } from "../models/careGiverModel.js"
import { deletefromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"

const registerCareGiver= asyncHandler( async (req,res) => {

    const { fullName, dateOfBirth, mobileNumber, email, address, fieldOfExpertise, yearsOfExpertise, qualifications, preferredWorkSchedule, languageSpoken, drivingLicence} = req.body;

    const userExist= await CareGiver.findOne({email});

    const careGiverImageLocalPath=req.files?.image?.[0]?.path

    const aadharImageLocalPath=req.files?.aadharDetail?.[0]?.path

    if(!fullName || !dateOfBirth || !mobileNumber || !email || !address || !fieldOfExpertise || !yearsOfExpertise || !qualifications
        || !preferredWorkSchedule || !languageSpoken || drivingLicence === undefined)
        {
            throw new ApiError(400, "All fields arerequired")
        }

        const parsedMobileNumber = String(mobileNumber);
        const parsedYearsOfExpertise = String(yearsOfExpertise);
        const parsedDrivingLicence = drivingLicence === 'true'; 

       
        if(userExist){
            throw new ApiError(402, "CareGiver Already Exists")
        }

        if(!careGiverImageLocalPath){
            throw new ApiError(400 ,"Image Not found")
        }

        if(!aadharImageLocalPath){
            throw new ApiError(400, "Aadhar Image not found")
        }
    
        
    const careGiverImage= await uploadOnCloudinary(careGiverImageLocalPath)

    const aadharImage= await uploadOnCloudinary(aadharImageLocalPath)

    console.log({
        fullName,
        dateOfBirth,
        mobileNumber,
        email,
        careGiverImage: careGiverImage.url,
        address,
        aadharImage: aadharImage.url,
        fieldOfExpertise,
        yearsOfExpertise,
        qualifications,
        preferredWorkSchedule,
        languageSpoken,
        drivingLicence
    });
    

    try{
        const careGiver= await CareGiver.create({
            fullName,
            dateOfBirth,
            mobileNumber:parsedMobileNumber,
            email,
            careGiverImage: careGiverImage.url,
            address,
            aadharImage: aadharImage.url,
            fieldOfExpertise,
            yearsOfExpertise:parsedYearsOfExpertise,
            qualifications,
            preferredWorkSchedule,
            languageSpoken,
            drivingLicence:parsedDrivingLicence
        })

        if(!careGiver){
            throw new ApiError(500, "Server Error while registering Care Giver")
        }

        return res.status(201).json( new ApiResponse(201, careGiver, "CAreGiver Registered Successfully"))
    }
    catch(error){
        console.log("Care Giver Creation failed");

        console.error("Care Giver Creation failed. Error details:", error);

        if(careGiverImage){
            await deletefromCloudinary(careGiverImage.public_id)
        }
        if(aadharImage){
            await deletefromCloudinary(aadharImage.public_id)
        }
        throw new ApiError(500,"Something went wrong while registerring the user and images were deleted")
    }

})

// Get All Caregivers
 const getAllCareGivers = asyncHandler( async (req, res) => {
    try {
        const caregivers = await CareGiver.find();
        if(!caregivers){
            throw new ApiError(404,"Error while Fetching")
        }
        return res.status(200).json(new ApiResponse(202, caregivers,"Fetched Successfully"));
    } 
    catch (err) {
        console.log(err);
        
        throw new ApiError(500, "Something went wrong while fetching the details")
}
});

// Push new data

const caregiverdashboard = asyncHandler(async(req,res)=>{
  try {
    const { caregiverName, bookingDetails } = req.body;

    const caregiver = await CareGiver.findOne({fullName:caregiverName});
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

   caregiver.completedBookings.push({
      ...bookingDetails,
      completedAt: new Date()
    });
    await caregiver.save();

    res.status(200).json({ message: "Booking marked as completed" });
  } catch (err) {
    console.error("Error marking booking complete:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
})

// const onecaregiver = asyncHandler(async(req,res)=>{
//   try{
//     const {caregivername}=req.query
//     if(!caregivername){
//         throw new ApiError(400,"please enter the caregiver name");
//     }
//     const requiredCaregiver =await CareGiver.findOne({fullName:caregivername})
//     if(!requiredCaregiver){
//         throw new ApiError(400,"Caregiver not found in database")
//     }
//     res.status(200).json(new ApiResponse(201,requiredCaregiver,"Caregiver fetched successfully"));

//   }catch(error){
//     console.log("error in fetching caregiver");
//      throw new ApiError(500, "Something went wrong while fetching caregiver details");
//   }
// })

export{
    registerCareGiver, getAllCareGivers ,caregiverdashboard 
}