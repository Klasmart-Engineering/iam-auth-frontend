import config from "@/config";
import { isSupportedLocale } from "@/locale";
import { IdTokenClaims } from "@/utils/azureB2C/claims";
import { MsalAuthenticationResult } from "@azure/msal-react";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const useUpdateLocale = (authenticationResult: MsalAuthenticationResult["result"]) => {
    useEffect(() => {
        const b2cLocale = (authenticationResult?.idTokenClaims as IdTokenClaims | undefined)?.locale;
        if (b2cLocale && isSupportedLocale(b2cLocale)) {
            new Cookies().set(`locale`, b2cLocale, {
                path: `/`,
                domain: config.server.domain,
            });
        }
    }, [ authenticationResult?.idTokenClaims ]);
};

export default useUpdateLocale;
