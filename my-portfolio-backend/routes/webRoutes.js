const express = require("express");
const router = express.Router();
const {
  getWebs,
  getWeb,
  createWeb,
  deleteWeb,
  updateWeb,
} = require("../controllers/webControllers");
const Web = require("../models/modelWeb");

// ALL
router.get("/", getWebs);

// SINGLE
router.get("/:id", getWeb);

// POST
router.post("/", createWeb);

// DELETE
router.delete("/:id", deleteWeb);

// UPDATE
router.patch("/:id", updateWeb);


module.exports = router;
