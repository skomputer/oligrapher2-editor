var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');

var config = {
  entry: [
    path.resolve(__dirname, 'app/main.jsx'),
  ],
  output: {
    path: 'build',
    filename: '/oligrapher.editor.min.js',
    library: 'OligrapherEditor',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env": { 'NODE_ENV': JSON.stringify('production') } })
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: [node_modules],
        loader: 'babel-loader' },
      { test: /\.css$/, 
        loader: "style-loader!css-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};


module.exports = config;
