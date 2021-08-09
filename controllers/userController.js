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
      const user = await Users.findById(req.params.id).select("-password");
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
};

module.exports = userController;
