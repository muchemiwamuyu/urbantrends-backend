import DeveloperProject from "../../models/developers/projects.js";
import ProjectAccess from "../../models/developers/projectAccess.js";

// Add a new project access
export const addProjectAccess = async (req, res) => {
  try {
    const { projectId, email } = req.body;

    if (!projectId || !email) {
      return res.status(400).json({ success: false, message: "Project ID and email are required" });
    }

    // Optional: prevent duplicate entries
    const existing = await ProjectAccess.findOne({ projectId, email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already has access to this project" });
    }

    const newAccess = await ProjectAccess.create({ projectId, email });
    res.status(201).json({ success: true, data: newAccess });
  } catch (error) {
    console.error("Add Project Access Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all projects by email
export const getProjectsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Find all project access entries for this email
    const accesses = await ProjectAccess.find({ email }).populate("projectId");

    // Extract the projects
    const projects = accesses.map(access => access.projectId);

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error("Get Projects By Email Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};