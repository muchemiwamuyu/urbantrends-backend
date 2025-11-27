import express from "express";
import { submitContactForm } from "../../orders/messages.js";

const router = express.Router()

// relevant routes
router.post('/send', submitContactForm)

export default router;