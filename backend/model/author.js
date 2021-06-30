const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name:String,
    image:String,
    nationality:String,
    description:String
});
const Author = mongoose.model('Author',AuthorSchema);
module.exports = Author;