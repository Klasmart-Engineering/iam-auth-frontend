import "webpack-dev-server";
import pkg from "./package.json";
import { execSync } from "child_process";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { config } from "dotenv";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "inline-chunk-html-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import {
    Configuration as WebpackConfiguration,
    EnvironmentPlugin,
    Module,
} from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

// Fix Webpack devServer typing
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570#issuecomment-474628163
interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

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
const DEV_SERVER_DOMAIN = process.env.DEV_SERVER_DOMAIN ?? `fe.alpha.kidsloop.net`;
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT ?? 8081;

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
                    // Minify CSS in production
                    // https://webpack.js.org/loaders/style-loader/#recommend
                    isDev ? `style-loader`: MiniCssExtractPlugin.loader,
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
        filename: `[name].[contenthash].js`,
        chunkFilename: `[name].[contenthash].js`,
        path: path.resolve(__dirname, `dist`),
        // Subroutes (e.g. createprofile) don't render correctly unless this is set
        publicPath: `/`,
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
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [ /runtime.+[.]js/ ]),
    ].concat(isDev ? [] : [
        new MiniCssExtractPlugin({
            filename: `[name].[contenthash].css`,
            chunkFilename: `[id].[contenthash].css`,
        }),
    ]),
    optimization: {
        moduleIds: `deterministic`,
        runtimeChunk: `single`,
        minimizer: [ `...`, new CssMinimizerPlugin() ],
        splitChunks: {
            chunks: `all`,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name (module: Module) {
                        // Typescript version of
                        // https://gist.github.com/davidgilbertson/838312f0a948423e4c4da30e29600b16?permalink_comment_id=3078438#gistcomment-3078438

                        const matches = module.context ? module.context.match(/[\\/]node_modules[\\/](?:(@[\w-]*?[\\/].*?|.*?)([\\/]|$))/): null;

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        // "/" replaced for flat file structure
                        return matches ? matches[1].replace(`@`, ``).replace(`/`, `-`) : `vendor`;
                    },
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: `vendor`,
                    chunks: `all`,
                    priority: -10,
                },
            },
        },
    },
    stats: {
        errorDetails: true,
    },
    devServer: {
        host: DEV_SERVER_DOMAIN,
        port: DEV_SERVER_PORT,
        server: `spdy`,
        historyApiFallback: true,
        proxy: {
            "/user": {
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
