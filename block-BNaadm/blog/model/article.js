var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    author: String,
    likes: Number,
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

module.exports = mongoose.model('Article', articlesSchema);
