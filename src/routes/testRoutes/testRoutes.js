import express from "express";
import { addData } from "../../tests/test1.js";

const router = express.Router()

// relevant routes
router.post('/test', addData)

export default router;