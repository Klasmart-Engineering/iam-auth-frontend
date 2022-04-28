export type { IdTokenClaims } from "./claims";
export {
    default as client,
    loginRequest,
} from "./client";
export {
    DEFAULT_IDP,
    isKidsloopIdp,
} from "./idp";
export {
    mapAzureB2CLocaleToKidsloopLocale,
    mapKidsloopLocaleToAzureB2CLocale,
} from "./locale";
export { buildB2CRedirectUri } from "./logout";
export type {
    OAuthLoginState,
    OAuthLogoutState,
} from "./state";
export {
    decodeLoginState,
    decodeLogoutState,
    encodeState,
} from "./state";
