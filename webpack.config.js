const path = require('path')
const join = function (fragment) {
    return path.join(__dirname, fragment)
}

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const createResolver = require('postcss-import-webpack-resolver')

module.exports = function (webpackEnv) {
    const isDevelopment = webpackEnv === 'development'
    const isProduction = webpackEnv === 'production'
    const envConfig = require('./config/env.config')(webpackEnv)

    return {
        mode: webpackEnv,
        entry: {
            main: join('src/main.ts'),
        },
        output: {
            path: isProduction ? envConfig.outputPath : join('server'),
            publicPath: isProduction ? envConfig.publicPath : '/',
            filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
        },
        resolve: {
            modules: [join('node_modules')],
            extensions: ['.ts', '.js', '.json'],
            alias: { '@': join('src'), 'vue$': 'vue/dist/vue.esm-bundler.js' },
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
                template: isDevelopment ? join('public/index-dev.html') : join('public/index.html'),
                favicon: join('public/favicon.png'),
                filename: 'index.html',
            }),
            isProduction && new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            new VueLoaderPlugin(),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'vue-loader',
                        },
                        {
                            loader: 'vue-markdown-loader/lib/markdown-compiler',
                            options: {
                                raw: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime'],
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                appendTsSuffixTo: ['\\.vue$'],
                                happyPackMode: false,
                            },
                        },
                    ],
                },
                {
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
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-import')({
                                        resolve: createResolver({
                                            alias: { '~@': join('src') },
                                        }),
                                    }),
                                    require('precss'),
                                    require('cssnano'),
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(bmp|gif|jpe?g|png|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: 'static/images/[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: 'static/fonts/[name].[hash:8].[ext]',
                        },
                    },
                },
            ].filter(Boolean),
        },
        performance: {
            maxEntrypointSize: 3000000,
            maxAssetSize: 3000000,
        },
    }
}
