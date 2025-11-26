import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
