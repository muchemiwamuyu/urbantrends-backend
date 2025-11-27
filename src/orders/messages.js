import contactMessage from "../../models/orders/contactMessage.js";
import transporter from "../../config/nodemailer.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const contact = await contactMessage.create({ name, email, message });

    // Send email notification
    await transporter.sendMail({
      from: `"UrbanTrends Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Order form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
};