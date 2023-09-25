const User = require("../models/modelUser");
const jwt = require("jsonwebtoken");

const Misc = require("../models/modelMisc");
const WebShow = require("../models/modelWebShow");
const WebTop = require("../models/modelWebTop");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// GET ALL
const getUser = async (req, res) => {
  const user = await User.find({});

  res.status(200).json(user);
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user.id);

    res.status(200).json({ username: user.username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CHANGE PASSWORD
const changePasswordUser = async (req, res) => {
  const { currentPassword, newPassword, verifPassword, username } = req.body;
  try {
    const user = await User.changePassword(
      username,
      currentPassword,
      verifPassword,
      newPassword
    );

    const token = createToken(user.id);

    res.status(200).json({ username: user.username, email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SIGNUP
const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    //MISC
    const misc = await Misc.create({
      profilTitle: username,
      profilDesc: "Profil Description",
      profilImage: "Profil Image",
      skillDesc: "Skill Description",
      user_mp: username,
      twitter: "twitter",
      instagram: "instagram",
      tiktok: "tiktok",
      youtube: "youtube",
      linkedin: "linkedin",
      email: email,
      whatsapp: "whatsapp",
    });

    // WEBS TOP
    const websTopArray = [];
    for (let i = 0; i < 4; i++) {
      const websTop = await WebTop.create({
        title: "Example",
        url: "Example",
        img: "Example",
        desc: "Example",
        date: "Example",
        user_mp: username,
      });
      websTopArray.push(websTop);
    }

    // WEBS SHOW
    const websShowArray = [];
    for (let i = 0; i < 8; i++) {
      const websShow = await WebShow.create({
        title: "Example",
        url: "Example",
        img: "Example",
        desc: "Example",
        date: "Example",
        user_mp: username,
      });
      websShowArray.push(websShow);
    }

    const token = createToken(user.id);

    res.status(200).json({ username, email, token }, misc, websTopArray, websShowArray);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  res.json({ msg: "pacth user" });
};

module.exports = {
  getUser,
  loginUser,
  signUpUser,
  updateUser,
  changePasswordUser,
};
