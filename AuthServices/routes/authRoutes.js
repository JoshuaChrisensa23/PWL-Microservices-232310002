const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    session: true,
  }),
  authController.googleCallback,
);

router.get("/failure", authController.authFailure);

router.get("/me", protect, authController.getMe);
router.post("/verify", authController.verifyToken);
router.post("/refresh", authController.refreshToken);
router.post("/logout", protect, authController.logout);

router.get("/user/:id", protect, authController.getUserById);
router.get("/users", protect, authController.getAllUsers);

router.get("/health", authController.healthCheck);

module.exports = router;
