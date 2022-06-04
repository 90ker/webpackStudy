const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const basicStyleLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
          ],
        ],
      },
    },
  }
]

module.exports = {
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: basicStyleLoader
          },
          {
            test: /\.less$/,
            use: [...basicStyleLoader, 'less-loader']
          },
          {
            test: /\.s[ac]ss$/,
            use: [...basicStyleLoader, 'sass-loader']
          },
          {
            test: /\.styl$/,
            use: [...basicStyleLoader, 'stylus-loader']
          },
          {
            test: /\.(jpe?g|png|gif|webp|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 20 * 1024
              }
            },
            generator: {
              filename: 'images/[hash:5][ext][query]'
            }
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: 'asset/resource',
            generator: {
              filename: 'icons/[hash:5][ext][query]'
            }
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslint-cache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new CssMinimizerPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: '3000',
    open: true
  },
  mode: 'development',
  devtool: 'cheap-module-source-map'
}