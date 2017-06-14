const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public'),
    publicPath: '/public'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  plugins: [new WriteFilePlugin()]
};
