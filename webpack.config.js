/* eslint-disable no-var */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [// Load LESS
      { test: /\.less$/, loader: "style!css!autoprefixer!less" },

      // Load SCSS
      { test: /\.scss$/, loader: "style!css!autoprefixer!sass" },

      // Load plain-ol' vanilla CSS
      { test: /\.css$/, loader: "style!css" },

      {
      test: /\.js$/,
      loader: 'babel',
      query: {
        plugins: [
          [
            'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }]
            },
            {
              presets:['react']
            }
          ]
        ]
      },
      include: path.join(__dirname, 'src')
    }]
  }
};
