const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentController = {
  // [POST] /api/comment
  create: async (req, res) => {
    try {
      const { postId, content } = req.body;

      const newComment = new Comments({
        content,
        user: req.user._id,
      });

      await Posts.findByIdAndUpdate(postId, {
        $push: {
          comments: newComment._id,
        },
      });

      await newComment.save();

      res.json({
        msg: "Create comment success.",
        comment: newComment,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [GET] /api/comments
  getList: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [PATCH] /api/comment/store/:id
  update: async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await Comments.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { content },
        { new: true }
      ).populate("user likes", "-password");

      if (!comment)
        return res.status(400).json({ msg: "Cannot update this comment!" });

      res.json({
        msg: "Update comment success.",
        comment,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [PATCH] /api/comment/like/:id
  likeComment: async (req, res) => {
    try {
      const comment = await Comments.findOne({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (comment)
        return res.status(400).json({ msg: "You liked this comment." });

      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            likes: req.user._id,
          },
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [PATCH] /api/comment/unlike/:id
  unLikeComment: async (req, res) => {
    try {
      const comment = await Comments.findOne({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (!comment)
        return res
          .status(400)
          .json({ msg: "You haven't liked this comment yet" });

      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $pull: {
            likes: req.user._id,
          },
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentController;
