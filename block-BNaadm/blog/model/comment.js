var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    content: {type: String, required: true},
    articleId: {type: Schema.Types.ObjectId, ref: "article"},
    likes: Number,
    author: String
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentsSchema);
