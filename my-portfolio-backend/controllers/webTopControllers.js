const WebTop = require("../models/modelWebTop");
const mongoose = require("mongoose");

// GET ALL
const getWebsTop = async (req, res) => {
  const webs = await WebTop.find({}).sort({ createdAt: -1 });

  res.status(200).json(webs);
};

// GET ONE
const getWebTop = async (req, res) => {
  const { id } = req.params;
  const web = await WebTop.findById(id);
    return res.status(200).json(web);
};

// POST
const createWebTop = async (req, res) => {
  const user_mp = req.user.username
  const { title, url, img, desc, date } = req.body;
  try {
    const web = await WebTop.create({ title, url, img, desc, date, user_mp });
    res.status(200).json(web);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateWebTop = async (req, res) => {
  const id = req.params.id;
  try {
    console.log("id yg dicup: ", id);
    const web = await WebTop.findByIdAndUpdate(id, {
      ...req.body,
    });

    res.status(200).json(web);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWebsTop,
  getWebTop,
  createWebTop,
  updateWebTop,
};
