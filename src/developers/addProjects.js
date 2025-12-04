import DeveloperProject from "../../models/developers/projects.js";
import multer from "multer";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";


// Multer setup (memory storage)
const upload = multer({ storage: multer.memoryStorage() }).single("image");

export const createProject = (req, res) => {
  // Wrap multer in route handler
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const {
        title,
        shortDescription,
        longDescription,
        category,
        tags,
        githubRepo,
        liveUrl,
        email, // added email
      } = req.body;

      let imageUrl = "";

      if (req.file) {
        // Upload file buffer to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        imageUrl = uploadResult.secure_url;
      }

      const project = await DeveloperProject.create({
        title,
        shortDescription,
        longDescription,
        category,
        tags: JSON.parse(tags), // frontend sends as JSON string
        githubRepo,
        liveUrl,
        imageUrl,
        email, // save email to DB
      });

      res.status(201).json({ success: true, data: project });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await DeveloperProject.find()
      .sort({ createdAt: -1 })
      .select("title shortDescription longDescription category tags githubRepo liveUrl imageUrl email createdAt updatedAt");

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get single project
export const getProjectById = async (req, res) => {
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

// Get projects by email
export const getProjectsByEmail = async (req, res) => {
  try {
    const { email } = req.params; // or req.query.email if you prefer query param
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const projects = await DeveloperProject.find({ email })
      .sort({ createdAt: -1 })
      .select("title shortDescription longDescription category tags githubRepo liveUrl imageUrl email createdAt updatedAt");

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
