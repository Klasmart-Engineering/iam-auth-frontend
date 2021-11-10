import { compilerOptions } from "./tsconfig.json";
import type { Config } from '@jest/types';
import crypto from "crypto";
import { defaults } from "jest-config";
import { pathsToModuleNameMapper } from "ts-jest/utils";

const config: Config.InitialOptions = {
    verbose: false,
    testEnvironment: `jsdom`,
    testPathIgnorePatterns: [ `/node_modules/` ],
    setupFilesAfterEnv: [ `<rootDir>/setupTests.ts` ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
        `ts`,
        `tsx`,
    ],
    moduleDirectories: [ `node_modules` ],
    moduleNameMapper: {
        "\\.(css|less)$": `<rootDir>/tests/mocks/styleMock.ts`,
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: `<rootDir>/`,
        }),
    },
    globals: {
        // Required for @azure/msal-* libraries to function with Jest
        // See https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1840
        crypto,
        // Must be specified if overriding `globals` object or ts-jest won't run
        "ts-jest": {},
    },
};

export default config;
