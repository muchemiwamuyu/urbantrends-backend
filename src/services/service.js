import Service from "../../models/services/services.js";

export const addService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

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
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
};
