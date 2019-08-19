
const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: "/",
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: '/',
    port: 9001
  },
  module: {
    rules: [
      {
        test : /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              [
                '@babel/preset-env',
                { 
                  useBuiltIns: 'usage',
                  corejs: 3,
                  modules: 'commonjs'
                }
              ],
            ]
          },
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}