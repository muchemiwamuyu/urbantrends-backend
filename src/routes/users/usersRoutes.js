import express from "express";
import { addUser } from "../../users/users.js";

const router = express.Router()

// relevant routes
router.post('/user', addUser);

export default router;