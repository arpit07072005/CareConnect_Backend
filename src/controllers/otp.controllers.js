// controllers/otpController.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import nodemailer from "nodemailer";

// Temporary in-memory store (in production, use DB or Redis)
const otpStore = new Map();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ziya7376502028@gmail.com",
      pass: "pujctdoeojaiiisj",     // app password (not your email password)
  },
});

// Send OTP to email
const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please provide an email address");
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP with expiry (5 minutes)
  otpStore.set(email, {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  // Send email
  const mailOptions = {
    from: "ziya7376502028@gmail.com",
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

// Verify OTP
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and OTP code are required" });
  }

  const otpData = otpStore.get(email);

  if (!otpData) {
    return res.status(400).json({ message: "OTP not found. Please request again." });
  }

  if (Date.now() > otpData.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired. Please request a new one." });
  }

  if (otpData.code !== code) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email); // OTP used up

  res.status(200).json({ message: "OTP verified successfully" });
});

export { sendOTP, verifyOTP };
