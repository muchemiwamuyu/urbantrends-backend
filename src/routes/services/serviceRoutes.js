import express from "express";
import { addService, getServices } from "../../services/service.js";

const router = express.Router()

// relevant routes
router.post('/create', addService)
router.get('/sers', getServices)

export default router