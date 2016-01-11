import mongoose from 'mongoose';

const config = {
  "mongodb": {
    "uri": "mongodb://127.0.0.1/search",
    "option": {
      "server": {
        "socketOptions": {
          "keepAlive": true
        }
      },
      "replset": {
        "socketOptions": {
          "keepAlive": true
        }
      }
    }
  }
}

mongoose.connect(config.mongodb.uri, config.mongodb.option, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
