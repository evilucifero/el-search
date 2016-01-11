let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  word: String,
  path: String,
  index: Array
});

export default mongoose.model('inverted', Schema);
