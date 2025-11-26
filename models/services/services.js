import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    icon: { type: String, required: false }, // you’ll store icon as a string name
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    price: { type: Number, required: true },
    priceLabel: { type: String, default: "Starting at" }
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
