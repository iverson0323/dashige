let express = require('express');
let multer = require('multer');
let uploads = multer({dest: './uploads'});
let User = require('../model').User;
let middleware = require('../middleware');


let router = express.Router();


router.get('/signup', middleware.loginCheck, function (req, res) {
    res.render('user/signup', {title: '注册页面'});
});


router.get('/login', middleware.loginCheck, function (req, res) {
    res.render('user/login', {title: '登录页面'});
});


router.get('/logout', middleware.notLoginCheck, function (req, res) {
    if (req.session.user) {
        req.flash('success', '退出成功');
        req.session.user = null;
        res.redirect('/');
    } else {
        req.flash('error', '您尚未登录，无需退出');
        res.redirect('/user/login');
    }
});


router.post('/signup', uploads.single('avatar'), function (req, res) {
    let user = req.body;
    user.avatar = '/3.jpg';
    User.create(user, function (err, user) {
        if (err) {
            req.flash('error', '注册失败，请重新注册');
            res.send({
                error: 1,
                redirectUrl: '/user/login'
            });
        } else {
            req.session.user = user;
            req.flash('success', `注册成功，欢迎${user.username}。`);
            res.send({
                error: 0,
                redirectUrl: '/'
            });
        }
    });
});


router.post('/login', function (req, res) {
    let user = req.body;
    User.findOne(user, function (err, user) {
        if (err) {
            req.flash('error', '登录失败，请重新登录');
            res.send({
                error: 1,
                redirectUrl: '/user/login'
            });
        } else {
            if (user) {
                req.flash('success', `登陆成功，欢迎${user.username}的再次归来。`);
                req.session.user = user;
                res.send({
                    error: 0,
                    redirectUrl: '/'
                });
            } else {
                req.flash('error', `账号或密码不匹配请重新登录`);
                res.send({
                    error: 1,
                    redirectUrl: '/user/login'
                });
            }
        }
    })
});


module.exports = router;