var serve = require('koa-static');
var koa = require('koa');
var app = koa();
var path = require('path');

app.use(serve(path.resolve(__dirname, '../client/demo')));

app.listen(3000);

console.log('listening on port 3000');
