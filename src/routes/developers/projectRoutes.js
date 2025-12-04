import express from "express";
import { createProject, getProjects, getProjectById, getProjectsByEmail } from "../../developers/addProjects.js";



const router = express.Router()

// relevant routes
router.post('/create', createProject);
router.get('/projects', getProjects);
router.get('/project/:id', getProjectById);
router.get('/projects/:email', getProjectsByEmail)

export default router;