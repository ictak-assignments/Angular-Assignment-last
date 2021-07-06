const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  image: String,
  description: String,
  author: String,
});
const BookData = mongoose.model("BookData", BookSchema);

module.exports = BookData;
