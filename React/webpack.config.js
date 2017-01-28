

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');


module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '/public/build/'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, "src")
        ]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: "react-hot-loader!babel",
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader!sass?sourceMap'
      },
      {
        test: /\.gif$/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      },
      {
        test: /\.svg/,
        loader: "url-loader?limit=26000&mimetype=image/svg+xml"
      },
      {
        test: /\.jsx$/,
        loader: "react-hot!babel",
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
};