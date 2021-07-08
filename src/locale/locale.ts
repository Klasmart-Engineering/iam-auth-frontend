import english from "./en.json";
import indonesian from "./id.json";
import korean from "./ko.json";
import vietnamese from "./vi.json";
import chinese from "./zh_CN.json";
import brandedEnglish from "@branding/locale/en.json";
import brandedIndonesian from "@branding/locale/id.json";
import brandedKorean from "@branding/locale/ko.json";
import brandedVietnamese from "@branding/locale/vi.json";
import brandedChinese from "@branding/locale/zh_CN.json";
import {
    createIntl,
    createIntlCache,
} from "react-intl";

Object.assign(english, brandedEnglish);
Object.assign(korean, brandedKorean);
Object.assign(chinese, brandedChinese);
Object.assign(vietnamese, brandedVietnamese);
Object.assign(indonesian, brandedIndonesian);

export const localeCodes = [
    `en`,
    `ko`,
    `zh-CN`,
    `vi`,
    `id`,
];

const intlCache = createIntlCache();
export const fallbackLocale = createIntl({
    locale: `en`,
    messages: english,
}, intlCache);
export function getIntl (locale: string) {
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
    }
}

const localeCache = new Map<string, ReturnType<typeof getIntl>>();
export function getDefaultLanguageCode () {
    const languages = navigator.languages || [
        (navigator as any).language,
        (navigator as any).browerLanguage,
        (navigator as any).userLanguage,
        (navigator as any).systemLanguage,
    ];
    for (const language of languages) {
        if (localeCodes.indexOf(language) !== -1) {
            return language;
        }
    }
    return `en`;
}

export function getLanguage (languageCode: string) {
    let language = localeCache.get(languageCode);
    if (language !== undefined) { return language; }
    language = getIntl(languageCode);
    localeCache.set(languageCode, language);
    if (language !== undefined) { return language; }
    return fallbackLocale;
}
