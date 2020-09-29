const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const MODE = 'production'

module.exports = [
  {
    mode: MODE,
    node: false,
    target: 'electron-main',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-syntax-class-properties']
            }
          }
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: './src/lang', to: path.resolve(__dirname, 'build', 'lang') }
        ],
      }),
    ],
    externals: [nodeExternals()]
  }, {
    mode: MODE,
    target: 'electron-preload',
    entry: './src/preload/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'preload.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-syntax-class-properties']
            }
          }
        }
      ]
    },
    externals: [nodeExternals()]
  }
];
