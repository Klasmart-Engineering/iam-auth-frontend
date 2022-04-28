import {
    mapAzureB2CLocaleToKidsloopLocale,
    mapKidsloopLocaleToAzureB2CLocale,
} from "./locale";
import {
    Locale,
    localeCodes,
} from "@/locale";

describe(`mapLocale`, () => {
    test.each(localeCodes)(`mapping %s locale code to, and back from, B2C locale is a no-op`, (locale: Locale) => {
        expect(mapAzureB2CLocaleToKidsloopLocale(mapKidsloopLocaleToAzureB2CLocale(locale))).toBe(locale);
    });
});
