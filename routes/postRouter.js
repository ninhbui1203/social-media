const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

router.post("/post/create", auth, postController.create);

module.exports = router;
