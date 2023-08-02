import path from "path";
import webpack from "webpack";
import "webpack-dev-server";

const prod = process.env.NODE_ENV === "production";
const withReport = process.env.WITH_REPORT;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const prodPlugins: webpack.Configuration["plugins"] = [
  new HtmlWebpackPlugin({
    template: path.resolve("./index.html"),
  }),
  new NodePolyfillPlugin(),
  new MiniCssExtractPlugin(),
  ...(prod && withReport ? new BundleAnalyzerPlugin() : []),
];

const devPlugins: webpack.Configuration["plugins"] = [
  new HtmlWebpackPlugin({
    template: path.resolve("./index.html"),
  }),
  new NodePolyfillPlugin(),
  new MiniCssExtractPlugin(),
  new ReactRefreshPlugin(),
];

const config: webpack.Configuration = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  target: "web",
  output: {
    path: path.resolve(__dirname + "/build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  devServer: prod
    ? undefined
    : {
        historyApiFallback: true,
      },
  plugins: prod ? prodPlugins : devPlugins,
};

export default config;
