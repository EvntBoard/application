const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const MODE = 'production'

module.exports = [
  {
    mode: MODE,
    target: 'electron-main',
    context: path.resolve(__dirname, 'src'),
    entry: path.resolve(__dirname, 'src', 'index.ts'),
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
      // new CopyPlugin({
      //   patterns: [
      //     { from: './src/lang', to: path.resolve(__dirname, 'build', 'lang') }
      //   ],
      // }),
    ],
    externals: [nodeExternals()],
    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
  }, {
    mode: MODE,
    target: 'electron-preload',
    context: path.resolve(__dirname, 'src'),
    entry: path.join(__dirname, 'src', 'preload', 'index.ts'),
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
    externals: [nodeExternals()],
    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
  }
];
