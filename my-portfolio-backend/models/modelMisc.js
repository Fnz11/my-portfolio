const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const miscSchema = new Schema({
  profilTitle: String,
  profilDesc: String,
  profilImage: String,
  skillDesc: String,
  skills: String,
  twitter: String,
  instagram: String,
  tiktok: String,
  youtube: String,
  linkedin: String,
  email: {
    type: String,
    required: true,
  },
  whatsapp: String,
  user_mp: {
    type: String,
    required: true,
  },
});

miscSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("misc", miscSchema);
