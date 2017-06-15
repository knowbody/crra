const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const defaultPort = require('./env.js').PORT;
const compiler = webpack(config);

const PORT = process.env.PORT || defaultPort;

const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../public'),
  publicPath: '/',
  compress: true,
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  overlay: true,
  clientLogLevel: 'error',
  stats: 'errors-only',
  hot: true,
});

try {
  server.listen(PORT);
} catch (e) {
  console.log(e);
  process.exit(1);
}

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    server.close();
    process.exit();
  });
});
