const path = require('path');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractBundleStyles = new MiniCssExtractPlugin({
    filename: 'assets/css/[name].css'
});

module.exports = {
    mode: 'development',
    entry: {
        'bundle': './clientSrc/app.js',
        // 'landing': './clientSrc/landing.js',
        // 'firebase-messaging-sw': './clientSrc/service-workers/firebase-messaging-sw.js'
    },
    output: {
        path: path.resolve(__dirname, '../public/'),
        filename: 'assets/js/[name].js'
    },
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        'module:@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-optional-chaining'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?url=false'
                ]
            },
            {
                test: /\.less$/,
                exclude: /(landing-page|scaffoldings).less/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?url=false',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        extractBundleStyles
    ],
    stats: {
        colors: true
    },
    devtool: 'eval-source-map'
};
