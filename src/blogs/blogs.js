import Blog from "../../models/blog/blogs.js";

export const addBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      message: "Blog post created successfully",
      blog
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating blog post",
      error: error.message
    });
  }
};

// get blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts" });
  }
};
