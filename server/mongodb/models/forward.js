let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  path: {type: String},
  title: {type: String},
  content: {type: String},
  index: [{
    word: String,
    index: Array
  }],
  type: {type: Number},
  taskId: {type: String}
});

export default mongoose.model('forward', Schema);
