const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './lib/js/src/index.js',
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public'),
    publicPath: '/public'
  },
  plugins: [
    new WriteFilePlugin({
      log: false,
      test: /main\.js/,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
