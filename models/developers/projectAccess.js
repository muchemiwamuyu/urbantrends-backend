import mongoose from "mongoose";

const projectAccessSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeveloperProject", // links to your DeveloperProject schema
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) =>
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: "Invalid email address",
      },
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const ProjectAccess =
  mongoose.models.ProjectAccess ||
  mongoose.model("ProjectAccess", projectAccessSchema);

export default ProjectAccess;
