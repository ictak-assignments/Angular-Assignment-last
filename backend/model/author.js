const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  image: String,
  nationality: String,
  description: String,
});
const AuthorData = mongoose.model("AuthorData", AuthorSchema);
module.exports = AuthorData;
// const Author = mongoose.model('Author',AuthorSchema);
// module.exports = Author;
