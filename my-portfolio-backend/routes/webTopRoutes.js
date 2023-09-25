const express = require("express");
const router = express.Router();
const {
  getWebsTop,
  getWebTop,
  createWebTop,
  updateWebTop,
} = require("../controllers/webTopControllers");

// ALL
router.get("/", getWebsTop);

// ONE
router.get("/:id", getWebTop);

// POST
router.post("/", createWebTop);

// UPDATE
router.patch("/:id", updateWebTop);

module.exports = router;
