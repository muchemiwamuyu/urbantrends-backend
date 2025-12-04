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

    // Validate tier index safely
    const tier = service.tiers?.[tierIndex];
    if (!tier) return res.status(400).json({ error: "Invalid tier selected" });

    // Build order safely
    const order = new Order({
      service: {
        id: service._id, // Use _id directly
        name: service.title || service.name || "Unnamed Service",
        image: service.icon || service.image || "",
      },
      tier,
      customer,
      notes: notes || "",
    });

    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error(err.message, err.stack); // detailed logging
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

// Get orders by customer email
export const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params; // get email from URL params
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Find orders where customer.email matches
    const orders = await Order.find({ "customer.email": email }).sort({ createdAt: -1 });

    if (!orders.length) return res.status(404).json({ error: "No orders found for this email" });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
