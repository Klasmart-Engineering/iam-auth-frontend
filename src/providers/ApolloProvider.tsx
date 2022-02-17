import { refreshToken } from "@/api/authentication";
import { utils } from "@/lib/kidsloop-px";
import { ApolloProvider } from "@apollo/client";
import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from "@apollo/client/core";
import { RetryLink } from "@apollo/client/link/retry";
import * as React from "react";

export default function ApolloProviderWrapper ({ children }: {children: JSX.Element}) {

    const objectCleanerLink = new ApolloLink((operation, forward) => {
        operation.variables = utils.trimStrings(operation.variables); // clean request data
        return forward(operation).map((value) => utils.trimStrings(value)); // clean response data
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

    const httpLink = new HttpLink({
        credentials: `include`,
        uri: `${process.env.API_ENDPOINT}user/`,
    });

    const client = new ApolloClient({
        credentials: `include`,
        link: ApolloLink.from([
            objectCleanerLink,
            retryLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    );
}
