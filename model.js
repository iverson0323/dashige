let mongoose = require('mongoose');
let url = require('./config').url;
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect(url);


let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});
exports.User = mongoose.model('User', UserSchema);


let ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt: {type: Date, default: Date.now},
    user: {type: ObjectId, ref: 'User'}
});
exports.Article = mongoose.model('Article', ArticleSchema);


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