const Posts = require("../models/postModel");

const postController = {
  create: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please upload at least 1 photo." });

      const newPost = new Posts({
        content,
        images,
        user: req.user.id,
      });
      newPost
        .populate("user likes", "_id username avatar createdAt")
        .execPopulate();
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

  getList: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      })
        .sort("-createdAt")
        .populate("user likes", "_id username avatar createdAt")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });
      res.json({
        msg: "Success",
        posts,
        result: posts.length,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { content, images } = req.body;
      if (images.length === 0)
        return res.status(400).json({ msg: "Please upload at least 1 photo." });

      const newPost = await Posts.findByIdAndUpdate(
        req.params.id,
        {
          content,
          images,
        },
        { new: true }
      ).populate("user likes", "_id avatar username createdAt");

      res.json({
        msg: "Update post success.",
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Posts.findOne({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (post) return res.status(400).json({ msg: "You liked this post." });

      await Posts.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({
        msg: "Like post success.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  unLikePost: async (req, res) => {
    try {
      const post = await Posts.findOne(
        {
          _id: req.params.id,
          likes: req.user._id,
        },
        { new: true }
      );

      if (!post)
        return res
          .status(400)
          .json({ msg: "You haven't liked this post yet." });

      await Posts.findByIdAndUpdate(req.params.id, {
        $pull: {
          likes: req.user._id,
        },
      });

      res.json({
        msg: "Unlike post success.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postController;
