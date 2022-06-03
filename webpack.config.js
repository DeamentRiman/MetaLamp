const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    watch: true,
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      clean: true,
      assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
        { 
          test: /\.html$/i,
          loader: 'html-loader',
        },
        { 
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCss.loader, 'css-loader', 'sass-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          }],
        },
        { 
          test: /\.(gif|png|jpe?g|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]'
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          },
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ],
    },
    plugins: [
      new MiniCss(),
      new HtmlWebpackPlugin({
        template: 'src/index.pug',
      }),
    ],
  };