import Product from "../../models/products/products.js";
import Order from "../../models/orders/orders.js";
import mongoose from "mongoose";

export const createProductOrder = async (req, res) => {
  try {
    const { productId, customer, quantity = 1, notes } = req.body;

    if (!productId || !customer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const order = new Order({
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      },
      customer,
      quantity,
      notes: notes || "",
    });

    await order.save();

    res.status(201).json({ message: "Product order created", order });
  } catch (err) {
    console.error(err.message, err.stack);
    res.status(500).json({ error: "Server error" });
  }
};

// get all products

export const getAllProductOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



// Get order by ID
export const getProductOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });
    
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("Get order by ID error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// get product by email
// Get orders by user email
// Get orders by customer email
export const getProductOrdersByEmail = async (req, res) => {
  const { email } = req.params; // or req.query.email
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  try {
    const orders = await Order.find({ "customer.email": email }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Get orders by customer email error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

