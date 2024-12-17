// This file will configure our Webpack.
// refactored into es6 module syntax for consistent import format
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// allowing us to use dotenv
const dotenv = require('dotenv'); 
dotenv.config(); 

// to allow the use of __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// refactored this from 'module.exports =' to 'export default'
export default {
  mode: 'development',
  // tell Webpack where the entrypoint of our application is
  entry: './src/client/index.js', //this will create a dependency graph

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]', //we want to keep our asset names
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Template',
      filename: 'index.html',
      template: './src/public/index.html',
    }),
    new BundleAnalyzerPlugin(),
  ],

  devtool: 'source-map', // this allows us to see what files are taking up a certain amt of space

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /.(js$|jsx)/,
        exclude: /node_modules/, //we don't need to transpile our libraries
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      //& adding this rule that uses regex to have files that are ts/tsx to load
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/i, //i allows our file names to be case insensitive
        type: 'asset/resource',
      },
    ],
  },
};
