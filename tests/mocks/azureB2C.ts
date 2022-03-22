import {
    AccountInfo,
    AuthenticationResult,
    AuthenticationScheme,
    Configuration,
} from "@azure/msal-browser";

export const RANDOM_TEST_GUID = `11553a9b-7116-48b1-9d48-f6d4a8ff8371`;

export const baseAccount: AccountInfo = {
    homeAccountId: `0950b42b-9c97-46db-ad76-39e231edf725-b2c_my_policy.990b35fd-da1d-4fd7-9155-05a4b07561ad`,
    localAccountId: `0950b42b-9c97-46db-ad76-39e231edf725`,
    tenantId: `612113ec-5afe-4f1c-8050-6863e509fc01`,
    environment: `kidsloop.b2clogin.com`,
    username: `joe.bloggs@kidsloop.live`,
    name: `Joe Bloggs`,
};

export const testAccount: AccountInfo = {
    ...baseAccount,
    idTokenClaims: {
        idp: `KidsloopB2C`,
    },
};

export const testFederatedAccount: AccountInfo = {
    ...baseAccount,
    idTokenClaims: {
        idp: `MCB`,
    },
};

export const testConfig: Configuration= {
    auth: {
        clientId: `0c8bbc72-6170-4da3-ac7c-d6f0e0cd8346`,
    },
};

export const testTokenResponse: AuthenticationResult = {
    authority: `https://login.microsoftonline.com/`,
    uniqueId: testAccount.localAccountId,
    tenantId: testAccount.tenantId,
    scopes: [ `openid`, `profile` ],
    idToken: `test-idToken`,
    idTokenClaims: {},
    accessToken: `test-accessToken`,
    fromCache: false,
    correlationId: RANDOM_TEST_GUID,
    expiresOn: new Date(Date.now() + 3600000),
    account: testAccount,
    tokenType: AuthenticationScheme.BEARER,
};
