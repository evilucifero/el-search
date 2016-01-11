var Segment = require('segment');
var segment = new Segment();
var textract = require('textract');
var glob = require('glob');
var fs = require('fs');
var co = require('co');
var cheerio = require('cheerio');

require('../mongodb/connect');
var ForwardCtrl = require('../mongodb/controller/forward');
var InvertedCtrl = require('../mongodb/controller/inverted');

segment.useDefault();

function getTitle(path) {
  var html = fs.readFileSync(path, {
    encoding: 'utf8'
  });
  var $ = cheerio.load(html);
  return $('title').text();
}

var allPathPromise = new Promise(function(resolve, reject) {
  glob('files/**/*.html', function(err, files) {
    if (err) {
      resolve([]);
    } else {
      resolve(files);
    }
  });
});

allPathPromise.then(function(allPath) {
  allPath.map(function(path) {
    textract.fromFileWithPath(path, function(err, text) {
      if (err) {
        resolve({});
      } else {
        console.log("Extract: " + path);
        var value = {
          path: path,
          title: getTitle(path),
          text: text,
          index: segment.doSegment(text, {
            simple: true,
            stripPunctuation: true
          })
        };
        var indexCollection = value.index.reduce(function(prev, now, i) {
          var hasFind = !prev.every(function(v) {
            return !(v.word === now);
          });
          if (hasFind) {
            return prev.map(function(v) {
              if (v.word === now) {
                var newIndex = v.index;
                newIndex.push(i);
                return {
                  word: v.word,
                  index: newIndex
                };
              } else {
                return v;
              }
            });
          } else {
            prev.push({
              word: now,
              index: [i]
            });
            return prev;
          }
        }, []);

        // 建立正向索引
        // forwardIndex[value.path] = indexCollection;
        var forwardCtrl = new ForwardCtrl();
        console.log('Save: ' + value.path);
        co(forwardCtrl.create({
          path: value.path.substring(5, value.path.length - 5),
          title: value.title,
          content: value.text,
          index: indexCollection
        })).catch(err => console.log(err));

        // 建立反向索引
        var invertedCtrl = new InvertedCtrl();
        indexCollection.map(function(word) {
          co(invertedCtrl.create({
            word: word.word,
            path: value.path.substring(5, value.path.length - 5),
            index: word.index
          })).catch(err => console.log(err));
        });
      }
    });
  });
});
