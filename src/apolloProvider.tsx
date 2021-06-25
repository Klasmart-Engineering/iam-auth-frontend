import * as React from "react";
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
} from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client";
import { RetryLink } from "@apollo/client/link/retry";
import { refreshToken } from "./api/restapi";
import { utils } from "kidsloop-px";


export function ApolloProviderHOC({ children }: {children: JSX.Element}) {
    
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
            retryIf: async (_e, _op) => {
                const success = await refreshToken()
                return success
            }
        }
    });
    
    const client = new ApolloClient({
        credentials: `include`,
        link: ApolloLink.from([ objectCleanerLink, uploadLink, retryLink ]),
        cache: new InMemoryCache(),
    });    

    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    );
}
