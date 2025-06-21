// controllers/otpController.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import twilio from "twilio";

// Send OTP to phone number
const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authtoken = process.env.TWILIO_AUTH_TOKEN;
const servicesid = process.env.TWILIO_SERVICE_ID;

const client = twilio(accountsid,authtoken,servicesid)
const sendOTP = asyncHandler(async (req, res) => {
   const { number } = req.body;

  if (!number) {
    throw new ApiError(400, "Please enter the number");
  }

  try {
    const verification = await client.verify.v2
      .services(servicesid)
      .verifications.create({
        to: `+91${number}`,
        channel: "sms",
      });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      sid: verification.sid,
    });
  } catch (error) {
    console.log("Error in sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify the OTP entered by user
const verifyOTP = asyncHandler(async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ message: "Phone and OTP code are required" });
  }

  try {
    const verification_check = await client.verify.v2
      .services(servicesid)
      .verificationChecks.create({
        to: `+91${phone}`,
        code,
      });

    if (verification_check.status === "approved") {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
});

export { sendOTP, verifyOTP };
