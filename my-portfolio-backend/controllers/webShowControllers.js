const WebShow = require("../models/modelWebShow");
const mongoose = require("mongoose");

// GET ALL
const getWebsShow = async (req, res) => {
  const webs = await WebShow.find({}).sort({ createdAt: -1 });

  res.status(200).json(webs);
};

// GET ONE
const getWebShow = async (req, res) => {
  const { id } = req.params;
  const web = await WebShow.findById(id);
  return res.status(200).json(web);
};

// POST
const createWebShow = async (req, res) => {
  const user_mp = req.user.username
  const { title, url, img, desc, date } = req.body;
  try {
    const web = await WebShow.create({ title, url, img, desc, date, user_mp });
    res.status(200).json(web);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateWebShow = async (req, res) => {
  const id = req.params.id;
  console.log("id yg dicup: ", id);
  try {
    const web = await WebShow.findByIdAndUpdate(id, {
      ...req.body,
    });

    res.status(200).json(web);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWebsShow,
  getWebShow,
  createWebShow,
  updateWebShow,
};
