import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { caregiverdashboard, getAllCareGivers, registerCareGiver } from "../controllers/careGiver.controller.js";
import { getAllUser, registeruser } from "../controllers/user.controller.js";
import { carddetail, paymentcontroller } from "../controllers/payment.controllers.js";
import { clientdashboard, getAllClient, userDetails } from "../controllers/client.controllers.js";
import {  sendOTP, verifyOTP } from "../controllers/otp.controllers.js";
import { gmailsendcaregiver, gmailsendclient } from "../controllers/Gmailsend.controllers.js";

const router= Router();

// register route

router.route("/register").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
        {
            name:"aadharDetail",
            maxCount:1
        }
    ]), registerCareGiver )

router.route("/fetch").get(getAllCareGivers)
router.route("/login/fetch").get(getAllUser)
router.route("/signup/register").post(registeruser)
router.route("/create").post(paymentcontroller);
router.route("/card-details").post(carddetail)
router.route("/client").post(userDetails)
router.route("/client/fetch").get(getAllClient)
router.route("/otp/send").post(sendOTP);       // Send OTP
router.route("/otp/verify").post(verifyOTP);
router.route("/gmail/send/caregiver").post(gmailsendcaregiver)
router.route("/gmail/send/client").post(gmailsendclient)
router.route("/mark-complete").post(caregiverdashboard)
router.route("/mark-clientcomplete").post(clientdashboard)
// router.route("/getcaregiver").post(onecaregiver)
   // Verify OTP


export default router
