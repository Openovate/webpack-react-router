const path = require('path');
const ReactRouterPlugin = require('../../src');
const VirtualFoldersPlugin = require('@openovate/webpack-virtual-folders');

module.exports = {
  mode: 'development',
  entry: {
    index: './client/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
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
    new VirtualFoldersPlugin({
      'client/screens/sample': path.resolve(__dirname, 'module/sample')
    }),
    new ReactRouterPlugin({
      link: 'client/components/Link.jsx',
      router: 'client/router.js',
      routes: {
        '/': './screens/Hello.jsx',
        '/about': './screens/About.jsx',
        '/more': './screens/sample/More.jsx',
        '/more/:id/(.+)': './screens/sample/More.jsx'
      }
    })
  ]
};
