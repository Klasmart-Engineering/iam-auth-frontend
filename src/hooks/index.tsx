export {
    useAccessToken,
    useConditionalLogoutFromB2C,
    useIsFederatedAccount,
    useOAuthLoginState,
    useOAuthLogoutState,
    useRedirectRequest,
    useUpdateLocale,
} from "./azureB2C";
export { useSearchParams } from "./router";
export { default as useIdentityProvider } from "./useIdentityProvider";
export { useInterval } from "./useInterval";
export { default as useIsAuthenticated } from "./useIsAuthenticated";
export { default as useLocale } from "./useLocale";
export type { Platform } from "./usePlatform";
export { default as usePlatform } from "./usePlatform";
export type { URLContext } from "./useURLContext";
export {
    URLContextProvider,
    useURLContext,
} from "./useURLContext";
