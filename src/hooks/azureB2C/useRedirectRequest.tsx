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

const buildRedirectRequest = ({
    platform, locale, idp,
}: {platform: Platform; locale: Locale; idp?: string}): RedirectRequest => {
    const extraQueryParameters: RedirectRequest["extraQueryParameters"] = {
        ui_locales: mapKidsloopLocaleToAzureB2CLocale(locale),
    };

    let redirectStartPage: string | undefined;
    if (idp) {
        extraQueryParameters[`idps`] = idp;
        // The default `redirectStartPage` is window.location.href
        // This results in an infinite login loop, because the `?idp` QueryParam is always present
        const currentURL = new URL(window.location.href);
        currentURL.searchParams.delete(`idp`);
        redirectStartPage = currentURL.toString();
    }

    return {
        ...loginRequest,
        domainHint: idp,
        state: encodeState({
            platform,
        }),
        // Need `select_account` to override MS cookies on the login.* domain, which ignore the
        // current signin request
        prompt: idp ? `select_account` : undefined,
        redirectStartPage,
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
