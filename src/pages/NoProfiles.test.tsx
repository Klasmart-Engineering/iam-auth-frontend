import NoProfiles from "@/pages/NoProfiles";
import {
    render,
    screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    withIntlProvider,
    withRouter,
} from "@tests/providers";
import { createMemoryHistory } from "history";
import React from "react";

describe(`NoProfiles`, () => {
    test(`when the "Sign out" button is clicked, it redirects to "/logout"`, () => {
        const history = createMemoryHistory({
            initialEntries: [ `/no-profiles` ],
        });

        render(withRouter(withIntlProvider(<NoProfiles />), history));

        userEvent.click(screen.getByTestId(`signout-button`));

        expect(history.location.pathname).toBe(`/logout`);
    });
});
