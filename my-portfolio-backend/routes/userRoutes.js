const express = require("express");
const router = express.Router();
const {
  getUser,
  loginUser,
  signUpUser,
  updateUser,
  changePasswordUser,
} = require("../controllers/userControllers");
const requireAuth = require("../middleware/requireAuth");

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signUpUser);

//Change Password
router.post("/changepassword", changePasswordUser);

router.use(requireAuth);

// GET
router.get("/", getUser);

// UPDATE
router.patch("/:id", updateUser);

module.exports = router;
