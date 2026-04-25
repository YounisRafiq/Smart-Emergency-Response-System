const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/multer.middleware");

router.post("/user/register", upload.single("profileImage") ,  userController.registerUser);
router.post("/user/login" , userController.loginUser);
router.get("/user/logout" , userController.logoutUser);

module.exports = router;
