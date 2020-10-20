const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const MODE = 'development'

module.exports = [
  {
    mode: MODE,
    target: 'electron-main',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
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
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    externals: [nodeExternals()]
  }
];
