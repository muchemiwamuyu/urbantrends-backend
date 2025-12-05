import Product from "../../models/products/products.js";
import connectDb from "../../config/database.js";


export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message
    });
  }
};

// get products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// get by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// delete products
export const deleteProduct = async (req, res) => {
  try {
    await connectDb();
    const deleted = await Product.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({message: "Product not found"})
    }

    res.status(200).json({message: "Product deleted successfully"})
  } catch (error) {
    res.status(500).json({message: "Failed to delete product", error: error.message})
  }
}




