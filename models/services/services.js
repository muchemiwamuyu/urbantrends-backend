import mongoose from "mongoose";

const TierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // e.g. "Basic", "Standard", "Premium"
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: false }, // in days
    revisions: { type: Number, required: false },
    features: { type: [String], default: [] }
  },
  { _id: false } // optional — avoids generating extra ObjectIds per tier
);

const ServiceSchema = new mongoose.Schema(
  {
    icon: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },  // general features
    priceLabel: { type: String, default: "Starting at" },

    // NEW: tiers
    tiers: {
      type: [TierSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);

