const express = require("express");
const router = express.Router();
const { getSosmed, updateSosmed, createSosmed } = require("../controllers/sosmedControllers");

// GET
router.get("/", getSosmed);

// POST
router.post("/", createSosmed);

// UPDATE
router.patch("/:id", updateSosmed);

module.exports = router;
