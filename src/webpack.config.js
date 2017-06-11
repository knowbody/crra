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
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    compress: true,
    watchContentBase: true,
    publicPath: path.resolve(__dirname, './public'),
    watchOptions: {
      ignored: /node_modules/,
    },
    clientLogLevel: 'error',
    stats: 'errors-only'
  },
  plugins: [new WriteFilePlugin({
    log: false,
  })]
};
