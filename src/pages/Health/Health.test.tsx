import { Health } from "./Health";
import {
    render,
    screen,
} from "@testing-library/react";
import React from "react";

describe(`VersionPage`, () => {
    describe(`Render`, () => {
        test(`OK text`, () => {
            render(<Health />);
            expect(screen.getByText(`OK`)).toBeInTheDocument();
        });
    });
});
