let express = require('express');
let {Artilce, Note} = require('../model');


let router = express.Router();


router.get('/', function (req, res) {
    let keyword = req.query.keyword;
    let keywordReg = new RegExp(keyword);
    let search = {};
    if (keyword) {
        search.$or = [{title: keywordReg}, {abstract: keywordReg}];
    }
    let pageNum = isNaN(req.query.pageNum) ? 1 : parseInt(req.query.pageNum);
    let pageSize = isNaN(req.query.pageSize) ? 5 : parseInt(req.query.pageSize);
    Note.count(search, function (err, count) {
        Note.find(search).sort({createAt: -1}).skip((pageNum - 1) * pageSize).limit(pageSize).exec(function (err, notes) {
            res.render('home', {
                title: '首页',
                articles: notes,
                keyword,
                pageSize,
                pageNum,
                totalPages: Math.ceil(count / pageSize)
            });
        });
    });
});

module.exports = router;