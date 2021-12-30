const browserify = require(`@cypress/browserify-preprocessor`);
const cucumber = require(`cypress-cucumber-preprocessor`).default;

module.exports = (on: (arg0: string, arg1: any) => void) => {
    const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve(`typescript`),
    };

    on(`file:preprocessor`, cucumber(options));
};
