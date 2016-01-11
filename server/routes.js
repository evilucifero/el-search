import Router from 'koa-router';
import ForwardCtrl from './mongodb/controller/forward';
import InvertedCtrl from './mongodb/controller/inverted';

const router = new Router();
const forwardCtrl = new ForwardCtrl();
const invertedCtrl = new InvertedCtrl();

router.get('/search', function*(next) {
  let paths = yield invertedCtrl.find({
    where: {
      word: this.query.keyword
    },
    select: 'path index'
  });
  let result = [];
  for (let i = 0; i < paths.length; i++) {
    let path = paths[i].path;
    let index = paths[i].index[0];
    let pages = yield forwardCtrl.find({
      where: { path },
      select: 'path title content'
    });
    if (pages.length > 0) {
      let page = pages[0];
      if (page.path === '/index.html')  page.path = '/';
      result.push({
        url: 'http://computer.hdu.edu.cn' + page.path,
        title: page.title,
        summary: page.content.substr(index, 150)
      });
    }
  }
  this.body = result;
  yield next;
});

export default router;
