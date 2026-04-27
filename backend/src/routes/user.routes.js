const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.post(
  "/add-emergency-contact",
  authMiddleware.authMiddleware,
  userController.addEmergencyContact,
);
router.get(
  "/emergency-contacts",
  authMiddleware.authMiddleware,
  userController.getEmergencyContact,
);
router.patch(
  "/update/emergency-contacts/:id",
  authMiddleware.authMiddleware,
  userController.updateEmergencyContact,
);
router.delete("/delete/emergency-contact:id", authMiddleware.authMiddleware);
router.get(
  "/profile",
  authMiddleware.authMiddleware,
  userController.getProfile,
);

module.exports = router;
