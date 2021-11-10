import {
    AccountInfo,
    Configuration,
} from "@azure/msal-browser";

export const testAccount: AccountInfo = {
    homeAccountId: `0950b42b-9c97-46db-ad76-39e231edf725-b2c_my_policy.990b35fd-da1d-4fd7-9155-05a4b07561ad`,
    localAccountId: `0950b42b-9c97-46db-ad76-39e231edf725`,
    tenantId: `612113ec-5afe-4f1c-8050-6863e509fc01`,
    environment: `kidsloop.b2clogin.com`,
    username: `joe.bloggs@kidsloop.live`,
    name: `Joe Bloggs`,
};

export const testConfig: Configuration= {
    auth: {
        clientId: `0c8bbc72-6170-4da3-ac7c-d6f0e0cd8346`,
    },
};
