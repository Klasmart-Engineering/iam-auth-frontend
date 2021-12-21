import { Location } from "history";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router";

interface LocaleState {
    locale: string | undefined;
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
