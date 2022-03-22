import {
    isSupportedLocale,
    Locale,
} from "@/locale";

// NB: Supported languages list found at
// https://docs.microsoft.com/en-us/azure/active-directory-b2c/language-customization?pivots=b2c-custom-policy#supported-languages
const azureB2CLocales = [
    `ar`,
    `bg`,
    `bn`,
    `ca`,
    `cs`,
    `da`,
    `de`,
    `el`,
    `en`,
    `es`,
    `et`,
    `eu`,
    `fi`,
    `fr`,
    `gl`,
    `gu`,
    `he`,
    `hi`,
    `hr`,
    `hu`,
    `id`,
    `it`,
    `ja`,
    `kk`,
    `kn`,
    `ko`,
    `lt`,
    `lv`,
    `ml`,
    `mr`,
    `ms`,
    `nb`,
    `nl`,
    `no`,
    `pa`,
    `pl`,
    `pt-br`,
    `pt-pt`,
    `ro`,
    `ru`,
    `sk`,
    `sl`,
    `sr-cryl-cs`,
    `sr-latn-cs`,
    `sv`,
    `ta`,
    `te`,
    `th`,
    `tr`,
    `uk`,
    `vi`,
    `zh-hans`,
    `zh-hant`,
] as const;

type AzureB2CLocale = typeof azureB2CLocales[number];

export const mapKidsloopLocaleToAzureB2CLocale = (locale: Locale): AzureB2CLocale => locale === `zh-CN` ? `zh-hans` : locale;

const isAzureB2CLocale = (locale: string): locale is AzureB2CLocale => azureB2CLocales.includes(locale as AzureB2CLocale);

export class UnexpectedAzureB2CLocaleError extends Error {
    constructor (locale: string) {
        super(`Unexpected Azure B2C locale ${locale}`);
        this.name = `UnexpectedAzureB2CLocaleError`;
    }
}

export class UnsupportedLocaleError extends Error {
    constructor (locale: string) {
        super(`${locale} is not a Kidsloop supported locale`);
        this.name = `UnsupportedLocaleError`;
    }
}

export const mapAzureB2CLocaleToKidsloopLocale = (code: string): Locale => {
    // `zh-hans` comes back from B2C as `zh-Hans`
    const locale = code.toLowerCase();

    if (!isAzureB2CLocale(locale)) {
        // We don't necessarily know how to convert this
        throw new UnexpectedAzureB2CLocaleError(locale);
    }

    const normalizedLocale = locale === `zh-hans` ? `zh-CN`: locale;

    if (!isSupportedLocale(normalizedLocale)) {
        throw new UnsupportedLocaleError(locale);
    }

    return normalizedLocale;
};
