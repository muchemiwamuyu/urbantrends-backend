import ProjectsSale from "../../models/developers/projectsSales.js";
import DeveloperProject from "../../models/developers/projects.js";

// Create a new Project Sale
export const createProjectSale = async (req, res) => {
  try {
    const { projectId, price, developerEmail } = req.body;

    if (!projectId || !price || !developerEmail) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // Fetch project details
    const project = await DeveloperProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Create ProjectSale
    const newSale = await ProjectsSale.create({
      project: project._id,
      projectTitle: project.title,
      projectDescription: project.longDescription || project.description,
      developerEmail,
      price,
    });

    res.status(201).json({ success: true, data: newSale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get all project sales
export const getAllProjectSales = async (req, res) => {
  try {
    const sales = await ProjectsSale.find().sort({ createdAt: -1 }).populate('project');
    res.status(200).json({ success: true, data: sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get a single project sale
export const getProjectSaleById = async (req, res) => {
  try {
    const sale = await ProjectsSale.findById(req.params.id).populate('project');
    if (!sale) return res.status(404).json({ success: false, error: 'Sale not found' });

    res.status(200).json({ success: true, data: sale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Update status (e.g., mark as Sold)
export const updateProjectSaleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Available', 'Sold', 'Removed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const sale = await ProjectsSale.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!sale) return res.status(404).json({ success: false, error: 'Sale not found' });

    res.status(200).json({ success: true, data: sale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};


// get sale by email
export const getProjectSalesByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    const sales = await ProjectsSale.find({ developerEmail: email }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    console.error("Error fetching sales by email:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching sales",
    });
  }
};