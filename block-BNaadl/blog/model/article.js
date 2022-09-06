var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    author: String,
    likes: Number
});

module.exports = mongoose.model('Article', articlesSchema);
