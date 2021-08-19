const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

router.get("/posts", auth, postController.getList);
router.post("/post/create", auth, postController.create);
router.patch("/post/store/:id", auth, postController.update);

module.exports = router;
