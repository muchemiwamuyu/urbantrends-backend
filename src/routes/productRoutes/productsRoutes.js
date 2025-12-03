import express from "express";
import { addProduct, getProducts } from "../../products/products.js";
import { createProductOrder } from "../../orders/productsOrderController.js";

const router = express.Router()

// relevant routes
router.post('/create', addProduct)
router.get('/prods', getProducts);
// order routes
router.post('/order/create', createProductOrder)

export default router