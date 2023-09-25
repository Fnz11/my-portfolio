const Web = require("../models/modelWeb");
const mongoose = require("mongoose");

// GET ALL
const getWebs = async (req, res) => {
  const webs = await Web.find({}).sort({createdAt: -1});

  res.status(200).json(webs);
};

// GET ONE
const getWeb = async (req, res) => {
  const { id } = req.params;
  const web = await Web.findById(id);

  // JIKA ID TIDAK TEPAT DIGITNYA
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Web tidak mukan!!");
  }

  // JIKA ID TIDAK DITEMUKAN
  if (!web) {
    return res.status(404).send("Web tidak ditemukan!!");
  } else {
    return res.status(200).json(web);
  }
};

// POST
const createWeb = async (req, res) => {
  const { title, url, img, desc, date } = req.body;
  try {
    const web = await Web.create({ title, url, img, desc, date });
    res.status(200).json(web);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
const deleteWeb = async (req, res) => {
  const { id } = req.params.id;

  // JIKA ID TIDAK TEPAT DIGITNYA
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Web tidak ditemukan!!");
  }

  const web = await Web.findByIdAndDelete({ _id: id });

  // JIKA ID TIDAK DITEMUKAN
  if (!web) {
    return res.status(404).send("Web tidak ditemukan!!");
  } else {
    return res.status(200).json(web);
  }
};

// UPDATE
const updateWeb = async (req, res) => {
  const { id } = req.params;

  // JIKA ID TIDAK TEPAT DIGITNYA
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Web tidak ditemukan!!");
  }

  const web = await Web.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  // JIKA ID TIDAK DITEMUKAN
  if (!web) {
    return res.status(404).send("Web tidak ditemukan!!");
  } else {
    return res.status(200).json(web);
  }
};

module.exports = {
  getWebs,
  getWeb,
  createWeb,
  deleteWeb,
  updateWeb,
};
