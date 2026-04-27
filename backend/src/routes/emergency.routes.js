const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const emergencyController = require("../controllers/emergencyMessage.controller")

router.post("/message" , authMiddleware.authMiddleware , emergencyController.sendEmergencyMessage)

module.exports = router;