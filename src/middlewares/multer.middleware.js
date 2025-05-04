import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "./public/temp";
        
        // Check if folder exists, if not create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Add timestamp to avoid conflicts
    }
});

export const upload = multer({ storage ,  limits: {
    fieldNameSize: 100, // default is 100 bytes — you can increase if needed
    fieldSize: 2 * 1024 * 1024, // max size per field (2MB here)
    fields: 20 // allow up to 20 non-file fields
  }});
