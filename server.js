let express = require('express');
let path = require('path');
let fs = require('fs');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let session = require('express-session');
let logger = require('morgan');
let FileStreamRotator = require('file-stream-rotator');
let connectMongo = require('connect-mongo')(session);
let connectFlash = require('connect-flash');
let url = require('./config').url;
let {user, home, article} = require('./routes/index');
let middleware = require('./middleware');


let logDirecotry = __dirname + '/logs';
fs.existsSync(logDirecotry) || fs.mkdirSync(logDirecotry);


let app = express();


// 加载静态资源文件
app.use(express.static(__dirname));
app.use(express.static(path.resolve('uploads')));
app.use(express.static(path.resolve('public')));


// 加载中间件
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(connectFlash());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    store: new connectMongo({url})
}));


// 设置ejs引擎
app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html', ejs.__express);


// 设置中间件的locals
app.use(function (req, res, next) {
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.user = req.session.user;
    next();
});


// 设置模块路由
app.use('/', home);
app.use('/user', user);
app.use('/article', article);


let accessLogStream = FileStreamRotator.getStream({
    filename: logDirecotry + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});
app.use(logger('combined', {stream: accessLogStream}));


app.listen(8080, console.log('8080 port is running'));