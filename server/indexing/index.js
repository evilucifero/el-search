var Segment = require('segment');
var segment = new Segment();
var textract = require('textract');
var glob = require('glob');
var fs = require('fs');
var forwardIndex = {};
var invertedIndex = {};
var co = require('co');
var cheerio = require('cheerio');
var ForwardCtrl = require('../mongodb/controller/forward');
require('../mongodb/connect');

segment.useDefault();

function getTitle(path) {
  var html = fs.readFileSync(path, {encoding: 'utf8'});
  var $ = cheerio.load(html);
  return $('title').text();
}

var allPathPromise = new Promise(function(resolve, reject) {
  glob('files/**/1*.html', function(err, files) {
    if (err) {
      resolve([]);
    }
    else {
      resolve(files);
    }
  });
});

allPathPromise.then(function(allPath) {
  Promise.all(
    allPath.map(function(path) {
      return new Promise(function(resolve, reject) {
        textract.fromFileWithPath(path, function(err, text) {
          if (err) {
            resolve({});
          }
          else {
            console.log("Extract: " + path);
            resolve({
              path: path,
              title: getTitle(path),
              text: text,
              index: segment.doSegment(text, { simple: true, stripPunctuation: true})
            });
          }
        });
      });
    })
  ).then(function(allIndex) {
      allIndex.map(function(value) {
      var indexCollection = value.index.reduce(function(prev, now, i) {
        var hasFind = !prev.every(function(v) {
          return !(v.word === now);
        });
        if (hasFind) {
          return prev.map(function(v) {
            if (v.word === now) {
              var newIndex = v.index;
              newIndex.push(i);
              return { word: v.word, index: newIndex };
            }
            else {
              return v;
            }
          });
        }
        else {
          prev.push({word: now, index: [i]});
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
      // indexCollection.map(function(word) {
      //   if (!(word in invertedIndex)) {
      //     invertedIndex[word.word]=[];
      //   }
      //   invertedIndex[word.word].push({ path: value.path, index: word.index });
      // })
    });

    // var finalIndex = JSON.stringify({ forwardIndex: forwardIndex, invertedIndex: invertedIndex });

    // fs.writeFile("finalIndex.json",finalIndex,function (err) {
    //   if (err) throw err ;
    //   console.log("Saved"); //文件被保存
    // });
    console.log('Finish indexing');
  });
});
