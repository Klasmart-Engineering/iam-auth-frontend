import GenericError from "@/components/GenericError";
import {
    render,
    screen,
} from "@testing-library/react";
import { withIntlProvider } from "@tests/providers";
import React from "react";

describe(`GenericError`, () => {
    it(`doesn't display the HomeButton if hideHomeButton=true`, () => {
        render(withIntlProvider(<GenericError hideHomeButton />));

        expect(screen.queryByTestId(`home-button`)).not.toBeInTheDocument();
    });

    it.each([ false, undefined ])(`displays the HomeButton if hideHomeButton=%1`, (hideHomeButton) => {
        render(withIntlProvider(<GenericError hideHomeButton={hideHomeButton} />));

        expect(screen.getByTestId(`home-button`)).toBeInTheDocument();
    });
});
