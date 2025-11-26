import express from "express";
import { addProduct, getProducts } from "../../products/products.js";

const router = express.Router()

// relevant routes
router.post('/create', addProduct)
router.get('/prods', getProducts);

export default router