var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    pages: Number,
    publication: String,
    cover_image: String,
    category: [String],
    authorId: {type: Schema.Types.ObjectId, ref: "author"}
});

module.exports = mongoose.model('Book', bookSchema);