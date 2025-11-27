import DeveloperProject from "../../models/developers/projects.js";

// Create a project
export const createProject = async (req, res) => {
  try {
    const project = await DeveloperProject.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await DeveloperProject.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const project = await DeveloperProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await DeveloperProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await DeveloperProject.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project removed",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};