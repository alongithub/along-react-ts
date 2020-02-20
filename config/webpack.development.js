module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 8006,
        progress: true,
        contentBase: './build',
        open: false,
        hot: true,
        disableHostCheck: true,  // 没有这项ie 会重复报错，
        historyApiFallback: true,
        host: '0.0.0.0',
        overlay: {
            warning: true,
            errors: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            }
        ]
    }
}