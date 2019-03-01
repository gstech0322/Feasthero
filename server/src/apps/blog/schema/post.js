const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BlogPost = new Schema({
    image: String,
    title: String,
    content: String,
    author: String,
    datePosted: Date,
});

module.exports = mongoose.model('blog', BlogPost, 'blog');
