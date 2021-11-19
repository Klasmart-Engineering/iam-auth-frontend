module.exports = {
    extends: [ `@kidsloop/eslint-config/react`, `@kidsloop/eslint-config/jest/react` ],
    rules: {
        "@typescript-eslint/type-annotation-spacing": `error`,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: `module`,
        project: `tsconfig.json`,
    },
};
