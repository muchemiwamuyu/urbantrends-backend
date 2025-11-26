import express from "express";
import { addBlog, getBlogs } from "../../blogs/blogs.js";

const router = express.Router();

// relevant routes
router.post('/create', addBlog)
router.get('/blo', getBlogs)

export default router