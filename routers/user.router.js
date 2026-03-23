const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logOut,

  updateProfile,
  checkAuth,
  updateTheme,
} = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.put("/update-profile", protectedRoute, updateProfile);
router.put("/theme", protectedRoute, updateTheme);

router.get("/me", protectedRoute, checkAuth);

module.exports = router;
