import mongoose from "mongoose";

const TierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  deliveryTime: { type: Number, required: true },
  revisions: { type: Number, required: true },
  features: [{ type: String }],
});

const OrderSchema = new mongoose.Schema(
  {
    service: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
      name: { type: String },
      image: { type: String },
    },
    tier: TierSchema,
    product: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      image: { type: String },
    },
    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    quantity: { type: Number, default: 1 }, // for products
    status: {
      type: String,
      enum: ["pending", "in-progress", "under-revision", "completed", "cancelled"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

