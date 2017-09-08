const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractSass = new ExtractTextPlugin('static/css/[name].css');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill', './src/app/index.tsx'
    ],
    devtool: 'inline-source-map',
    output: {
        path: path.join(path.join(process.cwd(), 'dist')),
        filename: 'static/js/[name].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js)|(jsx)$/,
                    /\.css$/,
                    /\.scss$/,
                    /\.sass$/,
                    /\.json$/,
                    /\.(ts)|(tsx)$/
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            }, {
                test: /\.(js)|(jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react'],
                            // plugins: ['transform-decorators-legacy']
                        }
                    }
                ]
            }, {
                test: /\.(ts)|(tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }, {
                        loader: 'ts-loader'
                    }
                ]
            }, {
                test: /\.(scss)|(css)$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    publicPath: '/'
                })
            }
        ]
    },
    devServer: {
        contentBase: './src',
        watchContentBase: true,
        overlay: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack
            .optimize
            .UglifyJsPlugin({sourceMap: true}),
        extractSass,
        // new webpack     .optimize     .CommonsChunkPlugin({         names: [
        // 'common', 'vendor'         ],         minChunks: 2     }),
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new BaseHrefWebpackPlugin({baseHref: '/'})
    ]
};