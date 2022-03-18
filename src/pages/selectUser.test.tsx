import { SelectUser } from "./selectUser";
import {
    Profiles,
    ProfilesDocument,
} from "@/api/user-service/operations";
import {
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import {
    withApolloProvider,
    withRouter,
} from "@tests/providers";
import { createMemoryHistory } from "history";
import React from "react";

test(`if the account has no associated Users, redirect to the "No Users" page`, async () => {
    const history = createMemoryHistory();

    render(withApolloProvider(withRouter(<SelectUser />, history), {
        mocks: [
            {
                request: {
                    query: ProfilesDocument,
                },
                result: {
                    data: {
                        myUser: {
                            profiles: [],
                        },
                    } as Profiles,
                },
            },
        ],
    }));

    expect(screen.getByTestId(`select_user-skeleton-list`)).toBeInTheDocument();

    await waitFor(() => expect(history.location.pathname).toBe(`/no-profiles`));
});
