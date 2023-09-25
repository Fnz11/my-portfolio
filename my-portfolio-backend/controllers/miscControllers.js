const Misc = require("../models/modelMisc");
const mongoose = require("mongoose");

// GET ALL
const getMiscs = async (req, res) => {
  const miscs = await Misc.find({});

  res.status(200).json(miscs);
};

// GET
const getMisc = async (req, res) => {
  const id = req.params.id;
  const misc = await Misc.findById(id);

  // JIKA ID TIDAK TEPAT DIGITNYA
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Misc tidak ditemukan!!");
  }

  // JIKA ID TIDAK DITEMUKAN
  if (!misc) {
    return res.status(404).send("misc tidak ditemukan!!");
  } else {
    return res.status(200).json(misc);
  }
};

// POST MISC
const createMisc = async (req, res) => {
  const user_mp = req.user.username;
  const { profilTitle, profilDesc, profilImage, skillDesc } = req.body;
  try {
    const misc = await Misc.create({
      profilTitle,
      profilDesc,
      profilImage,
      skillDesc,
      user_mp,
    });
    res.status(200).json(misc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateMisc = async (req, res) => {
  const id = req.params.id;
  // try {
  const misc = await Misc.findByIdAndUpdate(id, {
    ...req.body,
  });

  res.status(200).json(misc);
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = {
  getMiscs,
  getMisc,
  updateMisc,
  createMisc,
};
