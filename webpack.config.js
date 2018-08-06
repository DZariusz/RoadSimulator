const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" },
      { from: './app/favicon.ico', to: "favicon.ico" },
      { from: './app/ajax-loader.gif', to: "ajax-loader.gif" }
    ]),
     new MinifyPlugin({})
  ],
  module: {
    rules: [
      {
       test: /\.scss$/,
       exclude: /node_modules/,
       use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
    devServer: {
    host: 'localhost',
    port: 8000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
  }
}
