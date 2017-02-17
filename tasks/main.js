let readJS = require('./read').readJS;
let writeJS = require('./write').writeJS;
let Note = require('./model').Note;
let async = require('async');
let debug = require('debug')('logger:main');
let url = 'http://www.jianshu.com';

async.waterfall([
    function (callback) {
        // Note.remove({}, callback);
        callback();
    },
    function (data, callback) {
        readJS(url, callback);
    },
    function (noteLists, callback) {
        writeJS(noteLists, callback);
        debug('主程序：写入');

    }
], function (err, result) {
    debug('程序已完成');
});