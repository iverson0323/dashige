let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dashige');
let NoteSchema = new mongoose.Schema({
    url: String,
    imgSrc: String,
    author: String,
    authorUrl: String,
    avatarSrc: String,
    createAt: {type: Date, default: Date.now},
    title: String,
    abstract: String,
    category: String,
    categoryUrl: String,
});
exports.Note = mongoose.model('Note', NoteSchema);