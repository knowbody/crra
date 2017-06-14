const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const defaultPort = require('./env.js').PORT;
const compiler = webpack(config);

const PORT = process.env.PORT || defaultPort;

const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../public'),
  compress: true,
  watchContentBase: true,
  publicPath: path.resolve(__dirname, '../public'),
  watchOptions: {
    ignored: /node_modules/,
  },
  clientLogLevel: 'error',
  stats: 'errors-only',
});

server.listen(PORT);

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    server.close();
    process.exit();
  });
});
