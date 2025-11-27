import express from "express";
import { createProject, getProjects } from "../../developers/addProjects.js";



const router = express.Router()

// relevant routes
router.post('/create', createProject);
router.get('/projects', getProjects);

export default router;