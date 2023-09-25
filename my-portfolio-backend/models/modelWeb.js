const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    date: {
      type: String,
    },
    user_mp: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Web", webSchema);
