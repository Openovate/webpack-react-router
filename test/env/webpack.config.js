const path = require('path');
const ReactRouterPlugin = require('../../src');

module.exports = {
  mode: 'development',
  entry: {
    index: './client/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 3000,
    hot: false
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    ReactRouterPlugin
      .load('client')
      .link('screens/sample', path.resolve(__dirname, 'module/sample'))
      .route('/', './screens/Hello.jsx')
      .route('/about', './screens/About.jsx')
      .route('/more', './screens/sample/More.jsx')
  ]
};
