'use strict'

var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    contentBase: './client/demo',
    port: 3223
  },
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'client/src/js/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'client/demo/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'client/src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react' ]
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'client/src'),
        loader: 'style!css!sass',
      }
    ]
  }
};
