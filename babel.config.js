const pkg = require(`./package.json`);

module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            `@babel/preset-env`,
            {
                useBuiltIns: `usage`,
                corejs: pkg.dependencies[`core-js`],
            },
        ],
        `@babel/preset-react`,
        `@babel/preset-typescript`,
    ];

    const plugins = [
        `@babel/proposal-class-properties`,
        `@babel/proposal-object-rest-spread`,
        `@babel/plugin-transform-object-assign`,
        `@babel/plugin-proposal-optional-chaining`,
    ];

    return {
        presets,
        plugins,
    };
};
