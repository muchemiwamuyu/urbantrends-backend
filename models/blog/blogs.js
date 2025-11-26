import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true }, // you can convert to Date later
    readTime: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
