import { useMemo } from "react";
import { useLocation } from "react-router";
import { useCookies } from "react-cookie";
import { Location } from "history";

interface LocaleState {
    locale: string | undefined
}

export function useLocaleState () {
    const location: Location<LocaleState> = useLocation();
    const [ cookies ] = useCookies([ `locale` ]);

    const languageCode = useMemo<string>(() => {
        return location?.state?.locale ?? cookies.locale ?? `en`;
    }, [ location, cookies ]);

    return {
        locale: languageCode,
    };
}
