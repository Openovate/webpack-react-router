const path = require('path');
const ReactRouterPlugin = require('../src');
const VirtualFoldersPlugin = require('@openovate/webpack-virtual-folders');

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
    new VirtualFoldersPlugin({
      'test/env/client/screens/sample': path.resolve(__dirname, 'env/module/sample')
    }),
    new ReactRouterPlugin({
      link: 'test/env/client/components/Link.jsx',
      router: 'test/env/client/router.js',
      routes: {
        '/': './screens/Hello.jsx',
        '/about': './screens/About.jsx',
        '/more': './screens/sample/More.jsx'
      }
    })
  ]
};
