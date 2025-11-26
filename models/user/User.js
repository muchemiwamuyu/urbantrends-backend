import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
    },

    picture: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    // Add anything extra your app needs:
    // e.g. subscription, settings, etc.
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
