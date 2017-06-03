const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');

const prod = process.env.NODE_ENV == 'production';

module.exports = {
  entry: './lib/js/src/index',
  output: {
  	filename: '[name].js',
  	path: path.join(__dirname, './dist/build'),
  	publicPath: '/'
  },
  devServer: {
  	contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    }
  },
  module: {
  	rules: [
      {
  			test: /\.js$/,
  			loader: require.resolve('rollup-loader'),
  			options: {
  				plugins: [rollupPluginNodeResolve({
  					jsnext: true
  				})],
  			}
  		},
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: '[name].[ext]',
        },
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]_[hash:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html'),
    }),
    new CaseSensitivePathsPlugin(),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
}
