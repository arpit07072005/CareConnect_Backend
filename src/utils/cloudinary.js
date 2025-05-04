import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config()

    // Configuration OF CLOUDINARY
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try{
            if(!localFilePath) return null
            //upload the file on cloudinary
            const response=await cloudinary.uploader.upload(
                localFilePath, {
                    resource_type: "auto"
                }
            )
            console.log("File uploaded on cloudinary. File Src:"+ response.url)

            //once the file is uploaded we would like to delte it from ours servers

            fs.unlinkSync(localFilePath)
            return response
        }
        catch(error){
            fs.unlinkSync(localFilePath)
            return null
        }
    }

    const deletefromCloudinary= async(publicId)=>{
        try{
            cloudinary.uploader.destroy(publicId)
            console.log("Deleted from cloudinary", publicId);
            
        }
        catch(error){
            console.log("Error Deleting from cloudinary",error);
            return null;
            
        }
    }

    export {uploadOnCloudinary, deletefromCloudinary}