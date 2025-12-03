import express from "express";
import { createProject, getProjects, getProjectsById } from "../../developers/addProjects.js";



const router = express.Router()

// relevant routes
router.post('/create', createProject);
router.get('/projects', getProjects);
router.get('/project/:id', getProjectsById);

export default router;