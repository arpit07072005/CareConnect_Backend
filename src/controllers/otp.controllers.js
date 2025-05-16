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
    "AC0a76781b7b9d70053bc8d7e69f2e3c86",
    "73c531ba966471860f1ef47d42433c0b"
  );

  try {
    const verification = await client.verify.v2
      .services("VAf5d95b1b91c9ced12d2a91718eadc52d")
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
     "AC0a76781b7b9d70053bc8d7e69f2e3c86",
     "73c531ba966471860f1ef47d42433c0b"
   
  );

  try {
    const verification_check = await client.verify.v2
      .services("VAf5d95b1b91c9ced12d2a91718eadc52d")
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
