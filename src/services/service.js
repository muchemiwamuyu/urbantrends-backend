import Service from "../../models/services/services.js";

export const addService = async (req, res) => {
  try {
    const { title, description, icon, features, priceLabel, tiers } = req.body;

    // Basic validation (avoid empty/invalid tier arrays)
    if (tiers && !Array.isArray(tiers)) {
      return res.status(400).json({ message: "Tiers must be an array" });
    }

    // Validate each tier (optional but smart)
    if (Array.isArray(tiers)) {
      for (const tier of tiers) {
        if (!tier.name || !tier.price) {
          return res.status(400).json({
            message: "Each tier must include at least 'name' and 'price'"
          });
        }
      }
    }

    const service = await Service.create({
      title,
      description,
      icon: icon || "",
      features: features || [],
      priceLabel: priceLabel || "Starting at",
      tiers: tiers || []
    });

    res.status(201).json({
      message: "Service added successfully",
      service
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding service",
      error: error.message
    });
  }
};

// get all
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    // If no services exist
    if (!services || services.length === 0) {
      return res.status(200).json({
        message: "No services found",
        services: []
      });
    }

    res.status(200).json({
      message: "Services fetched successfully",
      count: services.length,
      services
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching services",
      error: error.message
    });
  }
};


// service by id
export const getService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service fetched successfully",
      service
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching service",
      error: error.message
    });
  }
};

// update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = req.body;

    // Validate tiers if included
    if (updates.tiers && !Array.isArray(updates.tiers)) {
      return res.status(400).json({ message: "Tiers must be an array" });
    }

    if (Array.isArray(updates.tiers)) {
      for (const tier of updates.tiers) {
        if (!tier.name || !tier.price) {
          return res.status(400).json({
            message: "Each tier must include 'name' and 'price'"
          });
        }
      }
    }

    const service = await Service.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating service",
      error: error.message
    });
  }
};

// delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service deleted successfully",
      service
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting service",
      error: error.message
    });
  }
};

