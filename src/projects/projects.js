import connectDb from "../../config/database.js";
import Project from "../../models/projects/projects.js";


// Create a project
export const createProject = async (req, res) => {
  try {
    await connectDb()
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    await connectDb()
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// Get a single project
export const getProject = async (req, res) => {
  try {
    await connectDb()
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch project" });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    await connectDb()
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update project" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    await connectDb()
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete project" });
  }
};
