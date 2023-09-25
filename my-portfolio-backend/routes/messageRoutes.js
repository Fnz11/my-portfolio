const express = require("express");
const router = express.Router();
const { getMessage, updateMessage, createMessage } = require("../controllers/messageControllers");
const requireAuth = require('../middleware/requireAuth')

// POST
router.post("/", createMessage);

router.use(requireAuth)

// GET
router.get("/", getMessage);


// UPDATE
router.patch("/:id", updateMessage);

module.exports = router;
