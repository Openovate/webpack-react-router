const path = require('path');
const ReactRouterPlugin = require('../src');

module.exports = {
  mode: 'development',
  entry: {
    index: './test/env/client/index.js'
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
        options: {
          presets: ['@babel/env', "@babel/preset-react"],
          plugins: [
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    ReactRouterPlugin
      .load('test/env/client')
      .link('screens/sample', path.resolve(__dirname, 'env/module/sample'))
      .route('/', './screens/Hello.jsx')
      .route('/about', './screens/About.jsx')
      .route('/more', './screens/sample/More.jsx')
  ]
};
