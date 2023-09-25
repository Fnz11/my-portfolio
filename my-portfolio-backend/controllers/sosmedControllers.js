const Sosmed = require("../models/modelSosmed");
const mongoose = require("mongoose");

// GET ALL
const getSosmed = async (req, res) => {
  const sosmed = await Sosmed.find({});

  res.status(200).json(sosmed);
};

// POST SOSMED
const createSosmed = async (req, res) => {
  const { twitter, instagram, tiktok, youtube, linkedin, email, whatsapp } =
    req.body;
  try {
    const sosmed = await Sosmed.create({
      twitter,
      instagram,
      tiktok,
      youtube,
      linkedin,
      email,
      whatsapp,
    });
    res.status(200).json(sosmed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateSosmed = async (req, res) => {
  const id = req.params.id;
  try {
    const sosmed = await Sosmed.findByIdAndUpdate(id, {
      ...req.body,
    });

    res.status(200).json(sosmed);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSosmed,
  updateSosmed,
  createSosmed,
};
