import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
} from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client";

export function ApolloProviderHOC({ children }: {children: JSX.Element}) {

    const link = createUploadLink({
        credentials: `include`,
        uri: `${process.env.API_ENDPOINT}user/`,
    });
    
    const client = new ApolloClient({
        credentials: `include`,
        link: ApolloLink.from([ link ]),
        cache: new InMemoryCache(),
    });    

    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    );
}
