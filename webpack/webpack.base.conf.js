const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    performance: {
        // 资源文件最大限制大小warning提示 1000kb
        maxAssetSize: 1000 * 1024,
        maxEntrypointSize: 1000 * 1024,
    },
    entry: {
        main: './src/app.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                loader: 'babel-loader',
                exclude: file => {
                    return /node_modules/.test(file)
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                // asset 自动地在 asset/resource 和 asset/inline 之间进行选择, 默认size < 8kb 实行asset/inline
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'images/[name].[hash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // asset 自动地在 asset/resource 和 asset/inline 之间进行选择, 默认size < 8kb 实行asset/inline
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor", // node_modules内的依赖库
                    chunks: "initial", // 只打包初始时依赖，异步引入单独打包
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minChunks: 1,
                    minSize: 0
                },
            }
        },
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    filter: (resourcePath) => {
                        return !/public\/index\.html$/.test(resourcePath);
                    },
                    to: path.resolve(__dirname, '../dist'),
                    noErrorOnMissing: true
                },
            ],
        }),
        // new ESLintPlugin(),
        new VueLoaderPlugin(),
        // 自动注入js、css等入口资源生成html文件
        new HtmlWebpackPlugin({
            inject: true,
            title: 'vue2 webpack',
            filename: 'index.html',
            template: 'index.html',
            favicon: path.resolve(__dirname, '../favicon.ico')
        }),
        // 提取style生成 css文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id][contenthash:8].css',
            ignoreOrder: true
        }),
        // 注入webpack编译时js中的全局变量
        new webpack.DefinePlugin({
            'process.env.THEME': JSON.stringify(process.env.THEME)
        })
    ],
    resolve: {
        // 路径别名以及文件默认查找后缀数组
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@styles': path.resolve(__dirname, '../src/styles'),
            '@images': path.resolve(__dirname, '../src/images'),
            '@theme': path.resolve(__dirname, `../src/styles/themes/${process.env.THEME}.scss`)
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
    }
};