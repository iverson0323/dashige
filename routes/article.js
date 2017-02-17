let express = require('express');
let {Note, Article} = require('../model');
let middleware = require('../middleware');


let router = express.Router();


router.get('/add', middleware.notLoginCheck, function (req, res) {
    res.render('article/add', {title: '发表文章', article: {title: '', content: ''}});
});


router.get('/detail/:_id', function (req, res) {
    let _id = req.params._id;
    Article.findById({_id}, function (err, article) {
        if (err) {
            req.flash('error', '文章未找到，请重试');
            res.redirect('back');
        } else {
            res.render('article/detail', {title: article.title, article});
        }
    });
});


router.get('/update/:_id', function (req, res) {
    let _id = req.params._id;
    Article.findById({_id}, function (err, article) {
        if (err) {
            req.flash('error', '文章未找到，暂时无法更新');
            res.redirect('back');
        } else {
            res.render('article/add', {title: '修改文章', article});
        }
    })
});


router.get('/delete/:_id', function (req, res) {
    let _id = req.params._id;
    Article.remove({_id}, function (err, result) {
        if (err) {
            req.flash('error', '文章删除出错，请重试');
            res.redirect('back');
        } else {
            let _idReg = new RegExp(_id);
            Note.remove({url: _idReg}, function (err, noteResult) {
                req.flash('success', '文章删除成功');
                res.redirect('/');
            });
        }
    });
});


router.post('/add', function (req, res) {
    let note = req.body;
    note.imgSrc = `/${Math.round(Math.random() * 8 + 1)}.jpg`;
    note.author = `${req.session.user.username}`;
    note.authorUrl = `/user/detail/${req.session.user._id}`;
    note.avatarSrc = `${req.session.user.avatar}`;
    var abstractReg = new RegExp(`([\u4e00-\u9fa5]+)|([a-z]+)`, 'g');
    let str = note.content.match(abstractReg);
    str = str.toString();
    str = str.length > 200 ? str.slice(0, 200) : str;
    note.abstract = str;
    note.category = '追梦';
    note.categoryUrl = 'javascript:;';
    let article = req.body;
    article.user = req.session.user._id;
    Article.create(article, function (err, article) {
        if (err) {
            req.flash('error', '文章发表失败，请重新尝试');
            res.redirect('back');
        } else {
            note.content = null;
            note.url = `/article/detail/${article._id}`;
            Note.create(note, function (err, note) {
                req.flash('success', '发表成功，已跳转到首页');
                res.redirect('/');
            });
        }
    })
});


router.post('/update/:_id', function (req, res) {
    let _id = req.params._id;
    let article = req.body;
    Article.update({_id}, article, function (err, article) {
        if (err) {
            req.flash('error', '文章修改出错，请重新尝试');
            res.redirect('back');
        } else {
            res.redirect(`/article/detail/${_id}`);
        }
    });
});

module.exports = router;