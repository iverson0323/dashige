let Note = require('./model').Note;
let debug = require('debug')('logger:write');

exports.writeJS = function (data, callback) {
    debug(`正在写数据:${data}`);
    Note.create(data, callback);
};