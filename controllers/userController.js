const { findById } = require("../models/userModel");
const Users = require("../models/userModel");

const userController = {
  // [GET] //api/search?username=:username
  search: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .select("avatar username fullname")
        .limit(10);

      res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [GET] /api/profile/:id
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: "User not found." });
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [PATCH] /api/profile/update
  updateUser: async (req, res) => {
    try {
      const { fullname, mobile, address, website, story, gender, avatar } =
        req.body;

      if (!fullname) res.status(400).json({ msg: "Fullname is required." });

      const user = await Users.findById(req.user.id);
      if (!user) res.status(400).json({ msg: "User does not exists." });

      await Users.findByIdAndUpdate(req.user.id, {
        fullname,
        mobile,
        address,
        website,
        story,
        gender,
        avatar,
      });

      res.json({
        msg: "Update user success.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [PATCH] /api/profile/:id/follow
  follow: async (req, res) => {
    try {
      res.send("Follow");
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user.id,
      });

      if (user.length)
        return res.status(500).json({ msg: "You followed this user." });

      await Users.findByIdAndUpdate(
        req.params.id,
        {
          $push: { followers: req.user.id },
        },
        { new: true } // return new data. Default new: false (return current data)
      );

      await Users.findByIdAndUpdate(
        req.user.id,
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // [PATCH] /api/profile/:id/unfollow
  unfollow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.user.id,
        followers: req.params.id,
      });
      if (!user)
        return res.status(500).json({ msg: "You have no follow this user." });

      // Delete following
      await Users.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      // Delete followers
      await Users.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { followers: req.user.id },
        },
        { new: true }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userController;
