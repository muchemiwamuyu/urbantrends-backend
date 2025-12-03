import express from "express";
import { createOrder, getOrderById, getOrders } from "../../orders/orderController.js";

const router = express.Router()

// relevant routes
router.post('/create', createOrder)
router.get('/ords', getOrders)
router.get('/orders/:id', getOrderById)

export default router