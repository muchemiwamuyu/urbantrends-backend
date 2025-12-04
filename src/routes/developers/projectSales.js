import express from "express";
import { createProjectSale, getAllProjectSales, getProjectSaleById, updateProjectSaleStatus } from "../../developers/sales.js";

const router = express.Router();

// relevant routes
router.post('/project-sales', createProjectSale);
router.get('/project-sales', getAllProjectSales);
router.get('/project-sales/:id', getProjectSaleById);
router.patch('/project-sales/:id/status', updateProjectSaleStatus);

export default router;