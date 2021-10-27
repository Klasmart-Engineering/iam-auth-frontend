import {
    b2cScopes,
    msalConfig,
} from "@/config";
import { PublicClientApplication } from "@azure/msal-browser";

const clientInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
    scopes: [ `email`, ...b2cScopes ],
};

export default clientInstance;
