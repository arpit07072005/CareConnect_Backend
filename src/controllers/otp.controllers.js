// controllers/otpController.js
import { asyncHandler } from "../utils/asyncHandle.js";
import twilio from "twilio";

// Send OTP to phone number
const sendOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_ACCOUNT_AUTH
  );

  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({ to: phone, channel: "sms" });

    res.status(200).json({ message: "OTP sent", status: verification.status });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify the OTP entered by user
const verifyOTP = asyncHandler(async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ message: "Phone and OTP code are required" });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_ACCOUNT_AUTH
  );

  try {
    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: phone, code });

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
