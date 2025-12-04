import express from "express";
import {
  createProjectSale,
  getAllProjectSales,
  getProjectSaleById,
  getProjectSalesByEmail,
  updateProjectSaleStatus
} from "../../developers/sales.js";

const router = express.Router();

// Create sale
router.post("/project-sales", createProjectSale);

// Get all sales
router.get("/project-sales", getAllProjectSales);

// Get sales by email (IMPORTANT: unique route name)
router.get("/project-sales/by-email/:email", getProjectSalesByEmail);

// Get sale by ID
router.get("/project-sales/:id", getProjectSaleById);

// Update status
router.patch("/project-sales/:id/status", updateProjectSaleStatus);

export default router;
