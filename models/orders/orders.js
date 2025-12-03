// models/Order.js
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
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
      name: { type: String, required: true }, // <-- this is the service name/title
      image: { type: String },
    },
    tier: { type: TierSchema, required: true },
    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "under-revision", "completed", "cancelled"],
      default: "pending",
    },
    notes: { type: String }, // optional instructions
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
