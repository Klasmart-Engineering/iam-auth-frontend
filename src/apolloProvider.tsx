import { refreshToken } from "./api/restapi";
import { ApolloProvider } from "@apollo/client";
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
} from "@apollo/client/core";
import { RetryLink } from "@apollo/client/link/retry";
import { createUploadLink } from "apollo-upload-client";
import { utils } from "kidsloop-px";
import * as React from "react";

export function ApolloProviderHOC ({ children }: {children: JSX.Element}) {

    const objectCleanerLink = new ApolloLink((operation, forward) => {
        operation.variables = utils.trimStrings(operation.variables); // clean request data
        return forward(operation).map((value) => utils.trimStrings(value)); // clean response data
    });
    const uploadLink = createUploadLink({
        credentials: `include`,
        uri: `${process.env.API_ENDPOINT}user/`,
    });
    const retryLink = new RetryLink({
        attempts: {
            max: 2,
            /*eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */
            retryIf: async (_e, _op) => {
                const success = await refreshToken();
                return success;
            },
        },
    });

    const client = new ApolloClient({
        credentials: `include`,
        link: ApolloLink.from([
            objectCleanerLink,
            uploadLink,
            retryLink,
        ]),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    );
}
