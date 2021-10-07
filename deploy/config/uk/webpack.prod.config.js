const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const webpack = require(`webpack`);

const { loadBrandingOptions } = require(`kidsloop-branding`);

const brandingOptions = loadBrandingOptions(process.env.BRAND);

module.exports = {
    mode: `production`,
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
                                quality: [ 0.65, 0.90 ],
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
            ...brandingOptions.webpack.resolve.alias,
        },
    },
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, `dist`),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./index.html`,
            ...brandingOptions.webpack.html,
            newRelicAccountID: `3286825`,
            newRelicAgentID: `322534651`,
            newRelicTrustKey: `3286825`,
            newRelicLicenseKey: `NRJS-eff8c9c844416a5083f`,
            newRelicApplicationID: `322534651`,
        }),
        new webpack.EnvironmentPlugin({
            API_ENDPOINT: `https://api.kidsloop.co.uk/`,
            AUTH_ENDPOINT: `https://auth.kidsloop.co.uk/`,
            REDIRECT_LINK: `https://hub.kidsloop.co.uk/`,
            ACCOUNT_ENDPOINT_BADANAMU: `https://ams-account.badanamu.net`,
            AUTH_ENDPOINT_BADANAMU: `https://ams-auth.badanamu.net`,
            SLD: `kidsloop`,
            TLD: `co.uk`,
        }),
    ],
    devServer: {
        host: `0.0.0.0`,
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
            "/transfer": {
                target: `http://localhost:8081`,
                secure: false,
            },

            "/refresh": {
                target: `http://localhost:8081`,
                secure: false,
            },
        },
    },
};
