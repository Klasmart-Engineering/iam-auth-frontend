module.exports = {
    extends: [ `@kl-engineering/eslint-config/react` ],
    rules: {
        "@typescript-eslint/type-annotation-spacing": `error`,
        // The following fix rule conflicts in @kl-engineering/eslint-config.
        // Indent solution copied from:
        // https://github.com/yannickcr/eslint-plugin-react/issues/2576#issuecomment-589781520
        // Additional overrides for closing tag/multiline wrapping to resolve remaining conflicts
        indent: [
            `error`,
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                // MemberExpression: null,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1,
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1,
                },
                CallExpression: {
                    arguments: 1,
                },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
                ignoredNodes: [
                    `JSXElement`,
                    `JSXElement > *`,
                    `JSXAttribute`,
                    `JSXIdentifier`,
                    `JSXNamespacedName`,
                    `JSXMemberExpression`,
                    `JSXSpreadAttribute`,
                    `JSXExpressionContainer`,
                    `JSXOpeningElement`,
                    `JSXClosingElement`,
                    `JSXFragment`,
                    `JSXOpeningFragment`,
                    `JSXClosingFragment`,
                    `JSXText`,
                    `JSXEmptyExpression`,
                    `JSXSpreadChild`,
                ],
                ignoreComments: false,
            },
        ],
        "react/jsx-indent": [ `error`, 4 ],
        "react/jsx-closing-tag-location": `off`,
        "react/jsx-wrap-multilines": [
            `error`,
            {
                declaration: `parens-new-line`,
                assignment: `parens-new-line`,
                return: `parens-new-line`,
                arrow: `parens-new-line`,
                condition: `parens-new-line`,
                logical: `parens-new-line`,
                prop: `parens-new-line`,
            },
        ],
        // Override @kl-engineering/eslint-config setting
        "react/no-multi-comp": `off`,
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
