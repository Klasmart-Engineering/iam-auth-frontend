import {
    Platform,
    useLocale,
    usePlatform,
} from "@/hooks";
import { Locale } from "@/locale";
import {
    encodeState,
    loginRequest,
    mapKidsloopLocaleToAzureB2CLocale,
} from "@/utils/azureB2C";
import type { RedirectRequest } from "@azure/msal-browser";
import { useMemo } from "react";

const buildRedirectRequest = ({
    platform, locale, idp,
}: {platform: Platform; locale: Locale; idp?: string}): RedirectRequest => {
    const extraQueryParameters: RedirectRequest["extraQueryParameters"] = {
        ui_locales: mapKidsloopLocaleToAzureB2CLocale(locale),
    };

    if (idp) {
        extraQueryParameters[`idps`] = idp;
    }

    return {
        ...loginRequest,
        domainHint: idp,
        state: encodeState({
            platform,
        }),
        extraQueryParameters,
    };
};

interface Props {
    idp?: string;
}

const useRedirectRequest = ({ idp }: Props = {}): RedirectRequest => {
    const [ locale ] = useLocale();
    const platform = usePlatform();

    return useMemo(() => buildRedirectRequest({
        platform,
        locale,
        idp,
    }), [
        locale,
        platform,
        idp,
    ]);
};

export default useRedirectRequest;
