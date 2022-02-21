import {
    Platform,
    useLocale,
    usePlatform,
} from "@/hooks";
import { Locale } from "@/locale";
import {
    encodeState,
    loginRequest,
} from "@/utils/azureB2C";
import { mapKidsloopLocaleToAzureB2CLocale } from "@/utils/azureB2C/locale";
import type { RedirectRequest } from "@azure/msal-browser";
import { useMemo } from "react";

const buildRedirectRequest = ({ platform, locale }: {platform: Platform; locale: Locale}): RedirectRequest => {
    return {
        ...loginRequest,
        state: encodeState({
            platform,
        }),
        extraQueryParameters: {
            ui_locales: mapKidsloopLocaleToAzureB2CLocale(locale),
        },
    };
};

const useRedirectRequest = (): RedirectRequest => {
    const [ locale ] = useLocale();
    const platform = usePlatform();

    return useMemo(() => buildRedirectRequest({
        platform,
        locale,
    }), [ locale, platform ]);
};

export default useRedirectRequest;
