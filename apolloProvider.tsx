import * as React from "react";
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
} from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client";
import { RetryLink } from "@apollo/client/link/retry";
import { refreshToken } from "./src/api/restapi";


export function ApolloProviderHOC({ children }: {children: JSX.Element}) {
    
    const retryLink = new RetryLink({
        attempts: {
            max: 2,
            retryIf: async (_e, _op) => {
                const success = await refreshToken()
                return success
            }
        }
    });
    const uploadLink = createUploadLink({
        credentials: `include`,
        uri: `${process.env.API_ENDPOINT}user/`,
    });
    
    const client = new ApolloClient({
        credentials: `include`,
        link: ApolloLink.from([ uploadLink, retryLink ]),
        cache: new InMemoryCache(),
    });    

    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    );
}
