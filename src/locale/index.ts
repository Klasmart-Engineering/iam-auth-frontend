import english from "./en.json";
import spanish from "./es.json";
import indonesian from "./id.json";
import korean from "./ko.json";
import thai from "./th.json";
import vietnamese from "./vi.json";
import chinese from "./zh_CN.json";
import brandedEnglish from "@branding/locale/en.json";
import brandedSpanish from "@branding/locale/es.json";
import brandedIndonesian from "@branding/locale/id.json";
import brandedKorean from "@branding/locale/ko.json";
import brandedThai from "@branding/locale/th.json";
import brandedVietnamese from "@branding/locale/vi.json";
import brandedChinese from "@branding/locale/zh_CN.json";
import {
    createIntl,
    createIntlCache,
} from "react-intl";

Object.assign(english, brandedEnglish);
Object.assign(spanish, brandedSpanish);
Object.assign(korean, brandedKorean);
Object.assign(chinese, brandedChinese);
Object.assign(vietnamese, brandedVietnamese);
Object.assign(indonesian, brandedIndonesian);
Object.assign(thai, brandedThai);

export const localeCodes = [
    `en`,
    `es`,
    `ko`,
    `zh-CN`,
    `vi`,
    `id`,
    `th`,
] as const;

export type Locale = typeof localeCodes[number];

interface Language {
    code: Locale;
    text: string;
}

export const LANGUAGES: Language[] = [
    {
        code: `en`,
        text: `English`,
    },
    {
        code: `es`,
        text: `Español`,
    },
    {
        code: `ko`,
        text: `한국어`,
    },
    {
        code: `zh-CN`,
        text: `汉语 (简体)`,
    },
    {
        code: `vi`,
        text: `Tiếng Việt`,
    },
    {
        code: `id`,
        text: `bahasa Indonesia`,
    },
    {
        code: `th`,
        text: `ภาษาไทย`,
    },
];

export const DEFAULT_LOCALE: Locale = `en`;

const supportedLocales = new Set(localeCodes);

export const isSupportedLocale = (code: string): code is Locale => supportedLocales.has(code as Locale);

const intlCache = createIntlCache();

export const fallbackLocale = createIntl({
    locale: DEFAULT_LOCALE,
    messages: english,
}, intlCache);

export function loadIntl (locale: Locale) {
    switch (locale) {
    case `zh-CN`:
        return createIntl({
            locale: `zh-CN`,
            messages: chinese,
        }, intlCache);
    case `ko`:
        return createIntl({
            locale: `ko`,
            messages: korean,
        }, intlCache);
    case `en`:
        return createIntl({
            locale: `en`,
            messages: english,
        }, intlCache);
    case `es`:
        return createIntl({
            locale: `es`,
            messages: spanish,
        }, intlCache);
    case `vi`:
        return createIntl({
            locale: `vi`,
            messages: vietnamese,
        }, intlCache);
    case `id`:
        return createIntl({
            locale: `id`,
            messages: indonesian,
        }, intlCache);
    case `th`:
        return createIntl({
            locale: `th`,
            messages: thai,
        }, intlCache);
    }
}

export const getPreferredBrowserLocale = (): Locale | undefined => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator
    const languages = navigator.languages || [
        navigator.language,
        // Opera
        (navigator as any).browserLanguage,
        // IE
        (navigator as any).userLanguage,
        (navigator as any).systemLanguage,
    ];
    // Some of these values may be null/undefined depending on the API and the browser
    return languages.filter(x => typeof x === `string`).find(isSupportedLocale);
};

export const cleanLocale = (locale: string | undefined): Locale | undefined => {
    if (locale === undefined) return undefined;
    if (!isSupportedLocale(locale)) {
        console.debug(`Unsupported locale %s, must be one of %s`, locale, localeCodes);
        return undefined;
    }
    return locale;
};
