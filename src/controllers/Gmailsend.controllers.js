import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import nodemailer from "nodemailer";


const gmailsendcaregiver = asyncHandler(async (req, res) => {
  const { gmail , message} = req.body;

  if (!gmail) {
    throw new ApiError(400, "Recipient email is required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ziya7376502028@gmail.com",
      pass: "pujctdoeojaiiisj",
    },
  });

  const mailOptions = {
    from: "ziya7376502028@gmail.com",
    to: gmail,
    subject: "Confirmation email",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send error:", error);
      return res.status(400).json(new ApiError(400, "Mail not sent"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Email sent successfully", info));
    }
  });
});

const gmailsendclient = asyncHandler(async (req, res) => {
  const { gmail , message} = req.body;

  if (!gmail) {
    throw new ApiError(400, "Recipient email is required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ziya7376502028@gmail.com",
      pass: "pujctdoeojaiiisj",
    },
  });

  const mailOptions = {
    from: "ziya7376502028@gmail.com",
    to: gmail,
    subject: "Confirmation email",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send error:", error);
      return res.status(400).json(new ApiError(400, "Mail not sent"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "Email sent successfully", info));
    }
  });
});



export {gmailsendcaregiver , gmailsendclient}