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
