import {
    b2cScopes,
    msalConfig,
} from "@/config";
import {
    AuthenticationResult,
    EventType,
    PublicClientApplication,
} from "@azure/msal-browser";

const setActiveAccount = (client: PublicClientApplication): void => {
    // TODO: IAM-241 - more sophisticated account selection
    if (client.getActiveAccount() !== null) {
        return;
    }

    const accounts = client.getAllAccounts();

    if (accounts.length) {
        client.setActiveAccount(accounts[0]);
    }
};

const setEventCallbacks = (client: PublicClientApplication): void => {
    client.enableAccountStorageEvents();

    client.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;
            client.setActiveAccount(account);
        }
    });
};

const initializeClient = (client: PublicClientApplication): void => {
    setActiveAccount(client);
    setEventCallbacks(client);
};

const clientInstance = new PublicClientApplication(msalConfig);
initializeClient(clientInstance);

export const loginRequest = {
    scopes: [ `email`, ...b2cScopes ],
};

export default clientInstance;
