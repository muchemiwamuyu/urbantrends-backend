import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: [String], default: [] },
    image: { type: String, required: true },
    popular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
