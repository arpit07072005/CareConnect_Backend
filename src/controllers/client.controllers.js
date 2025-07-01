import { client} from "../models/client.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";



const userDetails = asyncHandler(async(req,res)=>{
     const{fullName,phoneNumber,email,service,address}=req.body;
  if(fullName==="" || phoneNumber==="" ||email==="" ||service==="" || address===""){
    throw new ApiError(400,"enter all madatory fields");
  }
  const existedclient = await client.findOne({
    $or:[{email}]
  })

  if(existedclient){
    throw new ApiError(401,"User already exists")
  }

  const newclient = await client.create({
    fullName,
    email,
    phoneNumber,
    service,
    address
    
  })

  const createdclient = await client.findById(newclient._id).select(" -email");

  return res.status(201).json(
    new ApiResponse(200,createdclient,"User registered successfully")
  )
})
const getAllClient = asyncHandler(async (req,res)=>{
  try{
    const loggedinclient= await client.find();
    if(!loggedinclient){
      throw new ApiError(400,"no user found")
    }
    return res.status(200).json(new ApiResponse(200,loggedinclient,"client logged in successfully"))
  }catch(error){
    console.log("error while fetching")
  }

})

const clientdashboard = asyncHandler(async(req,res)=>{
  try {
    const { clientName, bookingDetails } = req.body;

    const clientdetails = await client.findOne({fullName:clientName});
    if (!clientdetails) {
      return res.status(404).json({ message: "Client not found" });
    }

   clientdetails.completedBookings.push({
      ...bookingDetails,
      completedAt: new Date()
    });
    await clientdetails.save();

    res.status(200).json({ message: "Booking marked as completed" });
  } catch (err) {
    console.error("Error marking booking complete:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
})

export {userDetails ,getAllClient ,clientdashboard}

