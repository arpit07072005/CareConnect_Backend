import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getAllCareGivers, registerCareGiver } from "../controllers/careGiver.controller.js";
import { getAllUser, registeruser } from "../controllers/user.controller.js";
import { carddetail, paymentcontroller } from "../controllers/payment.controllers.js";
import { userDetails } from "../controllers/client.controllers.js";

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

export default router
