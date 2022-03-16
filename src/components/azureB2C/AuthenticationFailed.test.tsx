import AuthenticationFailed from "./AuthenticationFailed";
import { AuthError } from "@azure/msal-common";
import { screen } from "@testing-library/react";
import {
    mockIntl,
    mockOnTranslationError,
    renderWithIntl,
} from "@tests/locale";
import React from "react";

describe(`AuthenticationFailed`, () => {
    const testError = new AuthError(`some-code`, `Something went wrong`);

    const render = () => renderWithIntl(<AuthenticationFailed error={testError} />);

    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, `error`).mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockClear();
    });

    test(`prints AuthenticationResult.error to console.error on initial render`, () => {
        render();

        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    test(`displays the generic authentication error messages`, () => {
        render();

        expect(screen.getByText(mockIntl.formatMessage({
            id: `authentication.error.generic.title`,
        }))).toBeInTheDocument();

        // Translation string deliberately contains a \n, which we want to have replaced by a newline
        // Bizarrely, RTL won't find this text unless we instead use search for the translation with a space over `\n`
        expect(screen.getByText(mockIntl.formatMessage({
            id: `authentication.error.generic.body`,
        }).split(`\n`).join(` `))).toBeInTheDocument();
        expect(screen.queryByText(`\n`)).not.toBeInTheDocument();

        expect(mockOnTranslationError).not.toHaveBeenCalled();
    });

});
