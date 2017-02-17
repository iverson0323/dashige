exports.loginCheck = function (req, res, next) {
    //检测是否已经登录
    if (req.session.user) {
        req.flash('error', '您已登录，如需执行此操作请退出登录');
        res.redirect('/');
    } else {
        next();
    }
};

exports.notLoginCheck = function (req, res, next) {
    // 检测是否未登录
    if (req.session.user) {
        next();
    } else {
        req.flash('error', '客官请登录后再来看我哦。')
        res.redirect('/user/login');
    }
};