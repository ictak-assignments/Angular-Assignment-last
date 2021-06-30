const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: String,
    image:String,
    description: String,
    author:String,
    // owner:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'

    // }nodemon app

});
const Book = mongoose.model('Book',BookSchema);

module.exports = Book;