import koa from 'koa';
import serve from 'koa-static';
import path from 'path';

const app = koa();

app.use(serve(path.resolve(__dirname, '../client/demo')));

app.listen(3000);

console.log('listening on port 3000');
