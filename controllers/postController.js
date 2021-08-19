const postModel = require("../models/postModel");

const postController = {
  create: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please upload at least 1 photo." });

      const newPost = new postModel({ content, images, user: req.user.id });
      await newPost.save();

      res.json({
        msg: "Create Post",
        post: newPost,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },
};

module.exports = postController;
