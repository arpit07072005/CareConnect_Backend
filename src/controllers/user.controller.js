import { user } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";

const registeruser = asyncHandler(async(req,res)=>{
  const{username,password,email}=req.body;
  if(username==="" || password==="" ||email===""){
    throw new ApiError(400,"enter all madatory fields");
  }
  const existeduser = await user.findOne({
    $or:[{username},{email}]
  })

  if(existeduser){
    throw new ApiError(401,"User already exists")
  }

  const newuser = await user.create({
    username,
    email,
    password
  })

  const createduser = await user.findById(newuser._id).select("-password -email");

  return res.status(201).json(
    new ApiResponse(200,createduser,"User registered successfully")
  )
})

const getAllUser = asyncHandler(async (req,res)=>{
  try{
    const loggedinuser = await user.find();
    if(!loggedinuser){
      throw new ApiError(400,"no user found")
    }
    return res.status(200).json(new ApiResponse(200,loggedinuser,"user logged in successfully"))
  }catch(error){
    console.log("error while fetching")
  }

})
export {registeruser,getAllUser}