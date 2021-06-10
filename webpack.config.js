const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        ui: "./src/entry.tsx",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    "css-modules-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            // mozjpeg: {
                            //     progressive: true,
                            //     quality: 65
                            // },
                            // // optipng.enabled: false will disable optipng
                            // optipng: {
                            //     enabled: false,
                            // },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader",
                ],
            },
            {
                test: /\.mp4$/,
                use: "file-loader?name=videos/[name].[ext]",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
        alias: {
            react: path.resolve("./node_modules/react"),
        },
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new webpack.EnvironmentPlugin({
            "API_ENDPOINT": "https://api.alpha.kidsloop.net/",
            "AUTH_ENDPOINT": "https://auth.alpha.kidsloop.net/",
            "AUTH_ENDPOINT_BADANAMU": "https://prod.auth.badanamu.net",
            "REDIRECT_LINK": "https://hub.alpha.kidsloop.net/",
            "SLD": "kidsloop",
            "TLD": "net",
        })
    ],
    devServer: {
        host: "fe.alpha.kidsloop.net",
        port: 8081,
        https: true,
        historyApiFallback: true,
        proxy: {
            "/transfer": {
                target: "https://auth.alpha.kidsloop.net/",
                secure: true,
                changeOrigin: true,
            },
            "/refresh": {
                target: "https://auth.alpha.kidsloop.net/",
                secure: true,
                changeOrigin: true,
            },
            "/switch": {
                target: "https://auth.alpha.kidsloop.net/",
                secure: true,
                changeOrigin: true,
            },
            "/signout": {
                target: "https://auth.alpha.kidsloop.net/",
                secure: true,
                changeOrigin: true,
            },
        }
    },
};