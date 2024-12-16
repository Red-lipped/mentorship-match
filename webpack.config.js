// This file will configure our Webpack.
const path= require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
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
        template: './src/public/index.html'
    }),
    new BundleAnalyzerPlugin(),
    ],

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000, 
        open: true, 
        hot: true,
        compress: true,
        historyApiFallback:true,
    },

    module: {
        rules: [
            {
                test: /.(js$|jsx)/,
                exclude: /node_modules/, //we don't need to transpile our libraries
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|jpeg|jpg|svg|gif)$/i, //i allows our file names to be case insensitive
                type: 'asset/resource',
            }
        ],

    }
}