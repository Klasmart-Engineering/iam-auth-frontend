import { IdTokenClaims as BaseIdTokenClaims } from "@azure/msal-common";

/**
 * Base B2C Claims + KidsLoop custom claims
 */
export interface IdTokenClaims extends BaseIdTokenClaims {
    idp: string;
    locale: string;
}
