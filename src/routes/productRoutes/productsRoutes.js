import express from "express";
import { addProduct, getProducts } from "../../products/products.js";
import { createProductOrder, getAllProductOrders, getProductOrdersByEmail } from "../../orders/productsOrderController.js";

const router = express.Router()

// relevant routes
router.post('/create', addProduct)
router.get('/prods', getProducts);
// order routes
router.post('/order/create', createProductOrder)
router.get('/products-orders', getAllProductOrders)
router.get('/prods-order/:email', getProductOrdersByEmail)

export default router