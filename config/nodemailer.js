import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,          // Use TLS
  secure: false,      // false for TLS
  auth: {
    user: "apikey",                  // literal string 'apikey'
    pass: process.env.SEND_GRID_API
  },
});

export default transporter 

