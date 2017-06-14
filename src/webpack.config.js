const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './lib/js/src/index',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public'),
    publicPath: '/public'
  },
  plugins: [new WriteFilePlugin({
    log: false,
  })]
};
