import contactMessage from "../../models/orders/contactMessage.js";
import transporter from "../../config/nodemailer.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const contact = await contactMessage.create({ name, email, message });

    // Send email notification via SendGrid
    await transporter.sendMail({
      from: `"UrbanTrends Website" <no-reply@urbantrends.com>`, // sender
      to: process.env.RECEIVER_EMAIL,                          // receiver
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Thank you! We have received your message and will contact you as soon as possible.",
    });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
};