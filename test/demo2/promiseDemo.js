/**
 * 备注：运行此JS文件之前，请先安装两个模块，安装完成之后此JS文件可以直接在node环境下运行
 * npm install jquery jsdom --save
 */
// 用于在JS环境中模拟DOM
let $ = require('jquery')(require('jsdom').jsdom().defaultView);


let promise = new Promise(function (resolve, reject) {
    // 开启一个异步ajax任务
    $.ajax({
        method: 'get',
        url: 'https://www.baidu.com/su?wd=华晨宇',
        jsonp: 'cb',
        dataType: 'jsonp',
        success: function (result) {
            // resolve和reject 都是一个回调函数
            if (result.p == false) {
                // resolve 代表成功后执行的回调，告诉promise实例成功之后返回的数据
                resolve(result);
            } else {
                // reject 代表当内容获取失败时执行的回调，告诉promise实例错误的原因
                reject('搜索的内容未找到');
            }
        }
    });
});


// promise.then() 有两个参数均是函数，上边的回调就是将结果传递给了这两个函数
promise.then(function (result) {
    // 成功态函数
    // 输出 搜索到我们喜爱的花花的相关数据
    console.log(result);
}, function (reject) {
    // 失败态函数
    console.log(reject);
});