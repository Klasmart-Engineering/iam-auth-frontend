import { isPlainObject } from "lodash-es";

const EXCESSIVE_STRINGS_REGEX = /\s+/g;

export const trimStrings = (input: any): any => {
    if (input === undefined || input === null) return input;
    if (Array.isArray(input)) return input.map((value) => trimStrings(value));
    if (isPlainObject(input)) return Object.fromEntries(Object.entries(input).map(([ key, value ]) => [ key, trimStrings(value) ]));
    if (typeof input !== `string`) return input;
    return input.trim().replace(EXCESSIVE_STRINGS_REGEX, ` `);
};
