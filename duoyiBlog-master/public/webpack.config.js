'use strict';

module.exports = {
  entry: {
    app: './app/app.js'
  },
  output: {
    path: './build',
    publicPath: '/build/',
    filename: 'build.js'
  },
  externals: {
    // 'jquery': 'jQuery'
  },
  resolve: {
    root: __dirname,
    alias: {
      // api: 'app/core/api.js'
    }
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue-loader'}
    ]
  },
  devtool: '#source-map'
};