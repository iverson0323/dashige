let markdown = require('markdown').markdown;
let fs = require('fs');
let read = fs.readFile('./1.md','utf8',function (err, result) {
    let html = markdown.toHTML(result,'Maruku');
    fs.writeFileSync('./2.html', html, 'utf8');
});


// console.log(markdown.toHTML(read,null,'utf8'));