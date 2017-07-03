const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public'),
    publicPath: '/public'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { test: /\.(re|ml)$/, use: 'bs-loader' },
    ]
  },
  resolve: {
    extensions: ['.re', '.js']
  },
  plugins: [
    // TODO: Not familiar with how Hot Replacement works, but it's not working with bs-loader
    
    // new WriteFilePlugin({
    //   log: false,
    //   test: /main\.js/,
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ]
};
