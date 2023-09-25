const express = require("express");
const router = express.Router();
const { getMisc, updateMisc, createMisc, getMiscs } = require("../controllers/miscControllers");
const requireAuth = require('../middleware/requireAuth')

// GET ALL
router.get("/", getMiscs);

// GET
router.get("/:id", getMisc);

router.use(requireAuth)

// POST
router.post("/", createMisc);

// UPDATE
router.patch("/:id", updateMisc);

module.exports = router;
