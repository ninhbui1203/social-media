const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const token = authorization.split(" ")[1];

    if (token === "undefined")
      return res.status(400).json({ msg: "Invalid Authentication." });

    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decode)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const user = await Users.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
