import express from "express";
import { addProjectAccess, getAllProjectAccess, getProjectsByEmail } from "../../developers/projectAccess.js";

const router = express.Router()

// relevant routes
router.post('/project-access', addProjectAccess);
router.get('/projects-access', getAllProjectAccess);
router.get('/projects-access/:email', getProjectsByEmail);

export default router;