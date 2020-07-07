const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

var config = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              rootMode: "upward"
            }
          },
          {
            loader: "eslint-loader",
            options: {
              rootMode: "upward"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './font/[hash].[ext]',
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  output: {
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  if (isProduction) {
    config.optimization.minimize = true;
    config.optimization.minimizer = [new TerserPlugin()];
    config.plugins.push(new Dotenv({
      path: "../../.env.prod"
    }));
  }
  else {
    config.devtool = 'source-map';
    config.plugins.push(new Dotenv({
      path: "../../.env.dev"
    }));
  }
  return config;
};