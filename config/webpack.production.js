const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyWbpackplugin = require('uglifyjs-webpack-plugin');
module.exports = {
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    // }
    optimization: {
        minimizer: [
            new UglifyWbpackplugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    conpress: {
                        drop_console: true,
                    },
                    output: null,
                }
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}