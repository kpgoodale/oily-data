var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['env']
              }
          }
      ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};