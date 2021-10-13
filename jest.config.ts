import { compilerOptions } from "./tsconfig.json";
import type { Config } from '@jest/types';
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
};

export default config;
