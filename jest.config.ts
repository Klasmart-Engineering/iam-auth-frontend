import { compilerOptions } from "./tsconfig.json";
import type { Config } from '@jest/types';
import crypto from "crypto";
import { defaults } from "jest-config";
import { pathsToModuleNameMapper } from "ts-jest/utils";

const config: Config.InitialOptions = {
    verbose: false,
    testEnvironment: `jsdom`,
    testPathIgnorePatterns: [ `/node_modules/` ],
    setupFiles: [ `<rootDir>/tests/setup.ts` ],
    setupFilesAfterEnv: [ `<rootDir>/tests/setupAfterEnv.ts` ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
        `ts`,
        `tsx`,
    ],
    moduleDirectories: [ `node_modules` ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/mocks/fileMock.ts`,
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
