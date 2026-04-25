const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.post("/add-emergency-contact" , authMiddleware.authMiddleware , userController.addEmergencyContact);
router.get("/profile" , authMiddleware.authMiddleware , userController.getProfile)

module.exports = router;