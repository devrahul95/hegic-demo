"use strict";
const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    index: "./src/main.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      os: require.resolve("os-browserify/browser"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      assert: require.resolve("assert/"),
      stream: false,
    },
  },
  output: {
    filename: "[name].js",
    publicPath: "/scripts/",
    path: path.resolve(__dirname, "../public/scripts"),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
