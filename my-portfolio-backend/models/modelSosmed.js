const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sosmedSchema = new Schema({
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
});

sosmedSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("sosmed", sosmedSchema);
