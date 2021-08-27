const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentController = require("../controllers/commentController");

router.get("/comments", auth, commentController.getList);
router.post("/comment", auth, commentController.create);
router.patch("/comment/store/:id", auth, commentController.update);
router.patch("/comment/like/:id", auth, commentController.likeComment);
router.patch("/comment/unlike/:id", auth, commentController.unLikeComment);

module.exports = router;
