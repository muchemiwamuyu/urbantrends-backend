import mongoose from "mongoose";

const allowedCategories = [
  "web",
  "mobile",
  "ai",
  "devops",
  "blockchain",
  "tools",
  "other",
];

const allowedTags = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AI",
  "Web3",
  "Mobile",
  "DevOps",
  "Database",
  "API",
  "Docker",
  "AWS",
];

const developerProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    longDescription: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: allowedCategories,
      required: true,
    },

    tags: {
      type: [String],
      enum: allowedTags,
      default: [],
    },

    githubRepo: {
      type: String,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message: "Invalid GitHub URL",
      },
    },

    liveUrl: {
      type: String,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message: "Invalid Live URL",
      },
    },

    imageUrl: {
      type: String,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message: "Invalid Image URL",
      },
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const DeveloperProject =
  mongoose.models.DeveloperProject ||
  mongoose.model("DeveloperProject", developerProjectSchema);

export default DeveloperProject;
