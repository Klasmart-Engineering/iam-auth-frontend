import "webpack-dev-server";
import pkg from "./package.json";
import { execSync } from "child_process";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { config } from "dotenv";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import {
    Configuration,
    EnvironmentPlugin,
} from "webpack";

config();

const modes: Required<Configuration["mode"]>[] = [
    `development`,
    `production`,
    `none`,
];

const dirtyNodeEnv = process.env.NODE_ENV as Configuration["mode"];
const nodeEnv = (modes.includes(dirtyNodeEnv) ? dirtyNodeEnv : undefined) ?? `production`;
const isDev = nodeEnv === `development`;

const { loadBrandingOptions } = require(`kidsloop-branding`);

const brandingOptions = loadBrandingOptions(process.env.BRAND);

const API_ENDPOINT = process.env.API_ENDPOINT ?? `https://api.alpha.kidsloop.net/`;
const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT ?? `https://api.alpha.kidsloop.net/`;

const webpackConfig: Configuration = {
    mode: nodeEnv,
    devtool: isDev ? `eval-cheap-module-source-map` : `source-map`,
    entry: {
        ui: `./src/entry.tsx`,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                },
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: `style-loader`,
                    },
                    `css-modules-typescript-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    `file-loader`,
                    {
                        loader: `image-webpack-loader`,
                        options: {
                            pngquant: {
                                quality: [ 0.65, 0.9 ],
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ `file-loader` ],
            },
            {
                test: /\.mp4$/,
                use: `file-loader?name=videos/[name].[ext]`,
            },
        ],
    },
    resolve: {
        extensions: [
            `.js`,
            `.jsx`,
            `.tsx`,
            `.ts`,
        ],
        alias: {
            react: path.resolve(`./node_modules/react`),
            "@": path.resolve(__dirname, `src`),
            ...brandingOptions.webpack.resolve.alias,
        },
    },
    output: {
        filename: `[name].[fullhash].js`,
        path: path.resolve(__dirname, `./deploy/dist`),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new EnvironmentPlugin({
            VERSION: pkg.version,
            GIT_COMMIT: execSync(`git rev-parse HEAD`).toString().trim().slice(0, 7),
        }),
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: `./index.html`,
            ...brandingOptions.webpack.html,
            ...isDev
                ? {}
                : {
                    newRelicAccountID: `3286825`,
                    newRelicAgentID: `322534651`,
                    newRelicTrustKey: `3286825`,
                    newRelicLicenseKey: `NRJS-eff8c9c844416a5083f`,
                    newRelicApplicationID: `322534651`,
                },
        }),
    ],
    stats: {
        errorDetails: true,
    },
    devServer: {
        host: `fe.alpha.kidsloop.net`,
        port: 8081,
        https: true,
        historyApiFallback: true,
        proxy: {
            "/user-service/user": {
                target: API_ENDPOINT,
                secure: true,
                changeOrigin: true,
            },
            "/transfer": {
                target: AUTH_ENDPOINT,
                secure: true,
                changeOrigin: true,
            },
            "/refresh": {
                target: AUTH_ENDPOINT,
                secure: true,
                changeOrigin: true,
            },
            "/switch": {
                target: AUTH_ENDPOINT,
                secure: true,
                changeOrigin: true,
            },
            "/signout": {
                target: AUTH_ENDPOINT,
                secure: true,
                changeOrigin: true,
            },
        },
    },
};

export default webpackConfig;
