import express from "express";
import { createOrder, getOrderById, getOrders, getOrdersByEmail } from "../../orders/orderController.js";

const router = express.Router()

// relevant routes
router.post('/create', createOrder)
router.get('/ords', getOrders)
router.get('/orders/:id', getOrderById)
router.get('/email/:email', getOrdersByEmail)

export default router