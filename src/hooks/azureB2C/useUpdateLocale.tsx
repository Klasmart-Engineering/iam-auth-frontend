import config from "@/config";
import { IdTokenClaims } from "@/utils/azureB2C/claims";
import { mapAzureB2CLocaleToKidsloopLocale } from "@/utils/azureB2C/locale";
import { MsalAuthenticationResult } from "@azure/msal-react";
import {
    useEffect,
    useState,
} from "react";
import { useCookies } from "react-cookie";

const useUpdateLocale = (authenticationResult: MsalAuthenticationResult["result"]): boolean => {
    const [ , setCookies ] = useCookies([ `locale` ]);
    const [ isUpdating, setIsUpdating ] = useState(true);

    useEffect(() => {
        const b2cLocale = (authenticationResult?.idTokenClaims as IdTokenClaims | undefined)?.locale;

        if (!b2cLocale) {
            setIsUpdating(false);
            return;
        }

        let kidsloopLocale;
        try {
            kidsloopLocale = mapAzureB2CLocaleToKidsloopLocale(b2cLocale);
        } catch (e) {
            console.warn(e);
            setIsUpdating(false);
            return;
        }

        setCookies(`locale`, kidsloopLocale, {
            path: `/`,
            domain: config.server.domain,
        });

        setIsUpdating(false);
    }, [ authenticationResult?.idTokenClaims, setCookies ]);

    return isUpdating;
};

export default useUpdateLocale;
