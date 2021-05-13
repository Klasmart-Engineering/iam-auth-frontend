const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "production",
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
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new webpack.EnvironmentPlugin({
            "API_ENDPOINT": "https://api.alpha.klpsre.com/",
            "AUTH_ENDPOINT": "https://auth.alpha.klpsre.com/",
            "REDIRECT_LINK": "https://hub.alpha.klpsre.com/",
            "ACCOUNT_ENDPOINT_BADANAMU": "https://ams-account.badanamu.net",
            "AUTH_ENDPOINT_BADANAMU": "https://ams-auth.prod.badanamu.net",
            "SLD": "kidsloop",
            "TLD": "com",
        })
    ],
    devServer: {
        host: "0.0.0.0",
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
            "/transfer": {
                target: "http://localhost:8081",
                secure: false,
            },

            "/refresh": {
                target: "http://localhost:8081",
                secure: false,
            },
        }
    },
};