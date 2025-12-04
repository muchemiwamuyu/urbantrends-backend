import express from "express";
import { addProjectAccess, getProjectsByEmail } from "../../developers/projectAccess.js";

const router = express.Router()

// relevant routes
router.post('/project-access', addProjectAccess);
router.get('/projects-access/:email', getProjectsByEmail);

export default router;