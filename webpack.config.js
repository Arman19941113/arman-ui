const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createResolver = require('postcss-import-webpack-resolver')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = function (webpackEnv) {
    const isProduction = webpackEnv === 'production'
    const envConfig = require('./config/env.config')(webpackEnv)

    return {
        mode: webpackEnv,
        entry: {
            main: path.resolve('example/main.js'),
        },
        output: {
            path: isProduction ? envConfig.outputPath : path.resolve('server'),
            publicPath: isProduction ? envConfig.publicPath : '/',
            filename: isProduction ? 'static/js/[name].[chunkhash].js' : 'static/js/[name].js',
        },
        resolve: {
            modules: [path.resolve('node_modules')],
            extensions: ['.js', '.json'],
            alias: {
                '@': path.resolve('src'),
                'vue$': 'vue/dist/vue.esm-bundler.js',
                'arman-ui/lib': path.resolve('src/components'),
            },
        },
        devtool: isProduction && envConfig.useSourceMap && 'source-map',
        optimization: {
            splitChunks: {
                minSize: 30000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve('public/index.html'),
                favicon: path.resolve('public/favicon.png'),
                filename: 'index.html',
            }),
            isProduction && new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
            }),
            new VueLoaderPlugin(),
        ].filter(Boolean),
        module: {
            rules: [{
                test: /\.md$/,
                use: [{
                    loader: 'vue-loader',
                }, {
                    loader: 'vue-markdown-loader/lib/markdown-compiler',
                    options: {
                        raw: true,
                        preventExtract: true,
                    },
                }],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
            }, {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            }, {
                test: /\.css$/,
                use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('postcss-import')({
                                resolve: createResolver({
                                    alias: { '~@': path.resolve('src') },
                                }),
                            }),
                            require('postcss-mixins'),
                            require('precss'),
                            require('cssnano'),
                        ],
                    },
                }],
            }, {
                test: /\.(bmp|gif|jpe?g|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        esModule: false,
                        name: 'static/images/[name].[hash:8].[ext]',
                    },
                },
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        esModule: false,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            }, {
                test: /\.(woff2?|eot|ttf|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        esModule: false,
                        name: 'static/fonts/[name].[hash:8].[ext]',
                    },
                },
            }].filter(Boolean),
        },
        performance: {
            maxEntrypointSize: 3000000,
            maxAssetSize: 3000000,
        },
    }
}
