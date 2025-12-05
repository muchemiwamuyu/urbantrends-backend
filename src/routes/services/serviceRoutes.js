import express from "express";
import { addService, deleteService, getServices } from "../../services/service.js";

const router = express.Router()

// relevant routes
router.post('/create', addService)
router.get('/sers', getServices);
router.delete('/service/:id', deleteService);

export default router