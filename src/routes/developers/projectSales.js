import express from "express";
import { createProjectSale, getAllProjectSales, getProjectSaleById, getProjectSalesByEmail, updateProjectSaleStatus } from "../../developers/sales.js";

const router = express.Router();

// relevant routes
router.post('/project-sales', createProjectSale);
router.get('/project-sales', getAllProjectSales);
router.get('/project-sales/:id', getProjectSaleById);
router.patch('/project-sales/:id/status', updateProjectSaleStatus);
router.get('/project-sales/:email', getProjectSalesByEmail);

export default router;