const express = require("express");
const router = express.Router();
const {
  getWebsShow,
  getWebShow,
  createWebShow,
  updateWebShow,
} = require("../controllers/webShowControllers");

// ALL
router.get("/", getWebsShow);

// ONE
router.get("/:id", getWebShow);

// POST
router.post("/", createWebShow);

// UPDATE
router.patch("/:id", updateWebShow)

module.exports = router;
