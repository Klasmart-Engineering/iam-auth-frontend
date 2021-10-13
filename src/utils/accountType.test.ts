import {
    getIdentityType,
    IdentityType,
} from "./accountType";

describe(`getIdentityType`, () => {
    test(`valid email addresses`, () => {
        expect(getIdentityType(`name@company.com`)).toBe(IdentityType.EMAIL);
    });

    test(`invalid email addresses`, () => {
        expect(getIdentityType(`namecompany.com`)).toBeUndefined();
    });

    test(`valid phone numbers`, () => {
        expect(getIdentityType(`+1234567890`)).toBe(IdentityType.PHONE);
        expect(getIdentityType(`1234567890`)).toBe(IdentityType.PHONE);
        expect(getIdentityType(`+12`)).toBe(IdentityType.PHONE);
        expect(getIdentityType(`+123456789012345`)).toBe(IdentityType.PHONE);
    });

    test(`invalid phone numbers`, () => {
        expect(getIdentityType(`+0123456789`)).toBeUndefined();
        expect(getIdentityType(`+1`)).toBeUndefined();
        expect(getIdentityType(`+1234567890123456`)).toBeUndefined();
    });

    test(`other`, () => {
        expect(getIdentityType(`hello`)).toBeUndefined();
        expect(getIdentityType(``)).toBeUndefined();
    });
});
