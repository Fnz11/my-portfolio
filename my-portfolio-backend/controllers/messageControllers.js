const Message = require("../models/modelMessage");
const mongoose = require("mongoose");

// GET ALL
const getMessage = async (req, res) => {
  const message = await Message.find({});

  res.status(200).json(message);
};

// POST MESSAGE
const createMessage = async (req, res) => {
  const { user_mp, name, email, message } = req.body;
  try {
    const messagee = await Message.create({
      name,
      email,
      message,
      user_mp
    });
    res.status(200).json(messagee);
  } catch (error) {
    res.status(400).json({ error: error.message, usernya: req.user });
  }
};

// UPDATE
const updateMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const message = await Message.findByIdAndUpdate(id, {
      ...req.body,
    });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMessage,
  updateMessage,
  createMessage,
};
