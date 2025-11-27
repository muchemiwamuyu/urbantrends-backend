import contactMessage from "../../models/orders/contactMessage.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // ensure env variable matches

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    await contactMessage.create({ name, email, message });

    // Send email via SendGrid
    const msg = {
      to: process.env.RECEIVER_EMAIL,          // receiver
      from: 'muchemiedwin68@gmail.com',        // verified sender in SendGrid
      replyTo: 'urbantrendsorganization@gmail.com', // optional
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send and log full SendGrid response
    const response = await sgMail.send(msg);
    console.log("SendGrid response:", response);

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully! We will communicate with you soon.",
    });
  } catch (error) {
    // log SendGrid detailed error
    if (error.response) {
      console.error("SendGrid response error:", error.response.body);
    } else {
      console.error("Error sending email:", error);
    }

    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
};
