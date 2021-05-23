const path = require('path');
const ROOT = path.resolve(__dirname);
const root = path.join.bind(path, ROOT);
const webpack = require('webpack');

module.exports = {
  entry: './src/server-electron.js',
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  target: 'node',
  module: {
    rules: [
      { test: /src\\.*\.(js)$/, use: 'babel-loader' },
    ],
  },
  output: {
    path: root('libserver'),
    filename: 'server.js',
    libraryTarget: 'umd',
  },
  externals: {
    sqlite3: 'sqlite3',
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
  ],
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve('node_modules/react-scripts/node_modules'),
    ],
  },
};
