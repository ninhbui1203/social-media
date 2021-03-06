const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

router.get("/post/:id", auth, postController.getPost);
router.get("/posts", auth, postController.getList);
router.post("/post/create", auth, postController.create);
router.patch("/post/store/:id", auth, postController.update);
router.patch("/post/like/:id", auth, postController.likePost);
router.patch("/post/unlike/:id", auth, postController.unLikePost);
router.delete("/post/:id", auth, postController.deletePost);

module.exports = router;
