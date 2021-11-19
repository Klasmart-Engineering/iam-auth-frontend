import {
    base64Decode,
    base64Encode,
} from "@/utils/encoding";

const decoded = `test_string`;
const encoded = `dGVzdF9zdHJpbmc=`;

describe(`base64Decode`, () => {
    test(`converts base64 to utf-8`, () => {
        expect(base64Decode(encoded)).toBe(decoded);
    });
});

describe(`base64Encode`, () => {
    test(`converts an input string to base64`, () => {
        expect(base64Encode(decoded)).toBe(encoded);
    });
});
