import koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import router from './routes';

const app = koa();

app.use(serve(path.resolve(__dirname, '../client/demo')));
app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
