let request = require('request');
let cheerio = require('cheerio');
let iconv = require('iconv-lite');
let fs = require('fs');
let debug = require('debug')('logger:read');

exports.readJS = function (url, callback) {
    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            let $ = cheerio.load(body);
            let noteLists = [];
            $('#list-container .note-list li').each(function (index, item) {
                let $item = $(item);
                let noteList = {
                    url: `${url}${$item.find('.wrap-img').attr('href')}`,
                    imgSrc: $item.find('.wrap-img img').attr('src'),
                    author: $item.find('.author .name .blue-link').text(),
                    authorUrl: `${url}${$item.find('.author .name .blue-link').attr('href')}`,
                    avatarSrc: $('.author .avatar img').attr('src'),
                    createAt: $('.author .name .time').attr('data-shared-at'),
                    title: $item.find('.content .title').text(),
                    abstract:$item.find('.content .abstract').text(),
                    category:$item.find('.content .collection-tag').text(),
                    categoryUrl:`${url}${$item.find('.content .collection-tag').attr('href')}`
                };
                debug(`正在读数据:${noteList.title}`);
                noteLists.push(noteList);
            });
            callback(null,noteLists);
        }else {
            callback(err);
        }
    });
};