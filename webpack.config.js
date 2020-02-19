const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
console.log(_mode);
const _isEnvDevelopment = _mode === 'development';
const _isEnvProduction = _mode === 'production';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
    mode: _mode,
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: _isEnvDevelopment ? '/' : '/build/',
    },
    plugins: [
        new webpack.DefinePlugin({
            // 注意变量名要用对象加属性的形式，否则项目中eslint 会报not defined
            'process.env.MODE': JSON.stringify(_mode), // 或者写成 "'development'"
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: _isEnvProduction ? {
                removeAttributeQuotes: true,
                // collapseWhitespace: true,
                hash: true,
            } : {}
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'readme.txt',
            to: '',
        }])
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [path.resolve("src")],
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: _isEnvDevelopment ? ['dynamic-import-node'] : [],
                    }
                }, 'eslint-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 将小于 1M 的图片通过base64打包到代码中
                        // 将大于 1M 的图片通过file-loader路径的形式引入
                        limit: 1000 * 1024,
                        // 指定输出文件路径
                        outputPath: 'images/',
                        name: '[name].[hash:5].[ext]',
                        publicPath: '', // 可以写cdn地址
                    }
                }
            }
        ]
    }
};

module.exports = merge(_mergeConfig, baseConfig);