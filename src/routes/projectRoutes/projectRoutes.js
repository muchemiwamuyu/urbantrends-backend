import express from "express";
import { createProject, getProjects } from "../../projects/projects.js";

const router = express.Router()

// relevant routes here
router.post('/create', createProject);
router.get('/projs', getProjects)

export default router;