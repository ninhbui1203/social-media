const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/search", auth, userController.search);

router.get("/profile/:id", auth, userController.getUser);

router.patch("/profile/update", auth, userController.updateUser);

module.exports = router;
