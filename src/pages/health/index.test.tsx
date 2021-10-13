import HealthPage from "./index";
import {
    render,
    screen,
} from "@testing-library/react";
import React from "react";

describe(`VersionPage`, () => {
    describe(`Render`, () => {
        test(`OK text`, () => {
            render(<HealthPage />);
            expect(screen.getByText(`OK`)).toBeInTheDocument();
        });
    });
});
