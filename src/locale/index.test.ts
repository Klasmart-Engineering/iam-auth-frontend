import { cleanLocale } from "./index";

describe(`cleanLocale`, () => {
    const originalDebug = window.console.debug;

    beforeAll(() => {
        window.console.debug = jest.fn();
    });

    afterAll(() => {
        window.console.debug = originalDebug;
    });

    test(`if undefined, returns undefined`, () => {
        expect(cleanLocale(undefined)).toBeUndefined();
    });

    test(`if not a supported locale, returns undefined`, () => {
        expect(cleanLocale(`some-made-up-locale`)).toBeUndefined();
    });

    test(`if a supported locale, returns that locale`, () => {
        expect(cleanLocale(`en`)).toBe(`en`);
    });
});
