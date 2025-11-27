import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // 465 for SSL
  secure: true,                         // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  family: 4, // force IPv4 to avoid ::1 errors
});

export default transporter;


