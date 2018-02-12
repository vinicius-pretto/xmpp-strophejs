const { resolve } = require('path');

module.exports = {
  context: resolve('client/js'),
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: resolve('client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}