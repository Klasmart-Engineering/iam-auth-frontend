import { Version } from "./Version";
import {
    render,
    screen,
} from "@testing-library/react";
import React from "react";

const OLD_ENV = process.env;

const GIT_COMMIT = `abcd123`;
const VERSION = `69.420.1337`;

beforeAll(() => {
    process.env = {
        ...OLD_ENV,
        GIT_COMMIT,
        VERSION,
    };
});

afterAll(() => {
    process.env = OLD_ENV;
});

describe(`Version`, () => {
    describe(`Render`, () => {
        test(`with process.env.GIT_COMMIT`, () => {
            render(<Version />);
            expect(screen.getByText(new RegExp(GIT_COMMIT))).toBeInTheDocument();
        });

        test(`with process.env.VERSION`, () => {
            render(<Version />);
            expect(screen.getByText(new RegExp(VERSION))).toBeInTheDocument();
        });
    });
});
