/* eslint-disable no-undef */
const webpack = require("webpack")
const path = require("path")
const nodeExternals = require("webpack-node-externals")

module.exports = {
  // bundling mode
  mode: "development",

  target: "node",

  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  externalsPresets: {
    node: true, // in order to ignore built-in modules like path, fs, etc.
  },

  // entry files
  entry: "./bin/www.ts",

  // output bundles (location)
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  // file resolutions
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      path: require.resolve("path-browserify"),
      util: require.resolve("util/"),
      assert: require.resolve("assert/"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url/"),
      os: require.resolve("os-browserify/browser"),
      timers: require.resolve("timers-browserify"),
    },
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.ts?/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: { allowTsInNodeModules: true },
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    new webpack.IgnorePlugin({
      resourceRegExp:
        /(aws-sdk|pg|pg-query-stream|oracledb|mysql|mysql2|tedious)/,
    }),
  ],
}
