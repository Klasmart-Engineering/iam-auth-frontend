import {
    NavigationClient as BaseNavigationClient,
    NavigationOptions,
} from "@azure/msal-browser";
import { History } from "history";

/**
 * Adapted from https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/707ad4454f2a7fa6f776b5d21d3c8af6b4de9a04/samples/msal-react-samples/typescript-sample/src/utils/NavigationClient.ts
 */
export class NavigationClient extends BaseNavigationClient {
    private history: History;

    constructor (history: History) {
        super();
        this.history = history;
    }

    /**
     * Navigates to other pages within the same web application
     * You can use the useHistory hook provided by react-router-dom to take advantage of client-side routing
     * @param url
     * @param options
     */
    // eslint-disable-next-line require-await
    async navigateInternal (url: string, options: NavigationOptions) {
        const relativePath = url.replace(window.location.origin, ``);
        if (options.noHistory) {
            this.history.replace(relativePath);
        } else {
            this.history.push(relativePath);
        }

        return false;
    }
}
