import Service from "../../models/services/services.js";
import Order from "../../models/orders/orders.js";
import mongoose from "mongoose";
export const createOrder = async (req, res) => {
  try {
    const { serviceId, tierIndex, customer, notes } = req.body;

    if (!serviceId || tierIndex === undefined || !customer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the service from DB
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Validate tier index
    const tier = service.tiers[tierIndex];
    if (!tier) return res.status(400).json({ error: "Invalid tier selected" });

    // Build order
    const order = new Order({
      service: {
        id: mongoose.Types.ObjectId(service.id),
        name: service.title, // service name/title
        image: service.icon || "",
      },
      tier,
      customer,
      notes: notes || "",
    });

    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error(err.message, err.stack);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};