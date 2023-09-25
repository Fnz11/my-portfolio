const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// STATIC SIGNUP
userSchema.statics.signup = async function (username, email, password) {
  const exist = await this.findOne({email})

  if (!email || !password) {
    throw Error("All fields must be filled")
  }

  if(!validator.isEmail(email)) {
    throw Error("Email is not valid")
  }

  if(!validator.isStrongPassword(password)) {
    throw Error("Password must have 8 character, uppercase, lowercase, number, and unique symbol")
  }

  if (exist) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = this.create({username, email, password: hash})

  return user
}

// STATIC LOGIN
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled")
  }

  const user = await this.findOne({email})

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

//STATIC CHANGE PASSWORD
userSchema.statics.changePassword = async function (username, currentPassword, verifPassword, newPassword) {
  const user = await this.findOne({username});
  console.log("backsendUser: ",user)
  if (!user) {
    throw Error('User not found');
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isCurrentPasswordValid) {
    throw Error('Current password is incorrect');
  }

  if (newPassword !== verifPassword){
    throw Error('Password and verif password not same')
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error('New password must have 8 character, uppercase, lowercase, number, and unique symbol');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedNewPassword;
  await user.save();

  return user;
};

module.exports = mongoose.model("user", userSchema);
