import config from "@/config";
import {
    DEFAULT_LOCALE,
    getPreferredBrowserLocale,
    isSupportedLocale,
    Locale,
} from "@/locale";
import { useMemo } from "react";
import { useCookies } from "react-cookie";

export const getDefaultLocale = (): Locale => getPreferredBrowserLocale() ??
            config.defaultLocale ??
            DEFAULT_LOCALE;

export default function useLocale (): [Locale, (l: Locale) => void] {
    const [ cookies, setCookies ] = useCookies([ `locale` ]);

    const locale = useMemo<Locale>(() => {
        const localeCookie = cookies?.locale;

        if (localeCookie && isSupportedLocale(localeCookie)) {
            return localeCookie;
        }

        return getDefaultLocale();
    }, [ cookies?.locale ]);

    const setLocale = (newLocale: Locale) => {
        setCookies(`locale`, newLocale, {
            path: `/`,
            domain: config.server.domain,
        });
    };

    return [ locale, setLocale ];
}
