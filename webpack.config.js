'use strict';
const path = require('path');
const webpack = require('webpack');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss',
    ],
    output: {
        path: path.resolve(__dirname, './static'),
        filename: 'js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                url: false
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new ExtractTextPlugin({
            filename: './css/style.bundle.css',
            allChunks: true
        }),
        new OptimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }],
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './src/fonts',
                to: './fonts'
            },
            {
                from: './node_modules/@fortawesome/fontawesome-free/webfonts',
                to: './webfonts'
            },
            {
                from: './src/img',
                to: './img'
            },
            {
                from: './src/video',
                to: './video'
            },
            {
                from: './src/pdf',
                to: './pdf'
            }
        ])
    ]
};
