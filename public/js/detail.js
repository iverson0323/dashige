var $content = $('#content');
var $title = $('.title');
var $brand = $('#headline');
var $navbarInner = $('.navbar-inner');


// $brand.addClass('navbar-header').removeClass('brand');

$brand.html(`<a class="brand" href="/">首页</a>`);

$content.css({
    width: '800px'
});