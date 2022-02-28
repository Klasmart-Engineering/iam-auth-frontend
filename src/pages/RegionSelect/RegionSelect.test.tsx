import {
    defaultURLContext,
    withIntlProvider,
    withRouter,
    withURLContext,
} from "@/../tests/providers";
import RegionSelect, {
    Region,
    regions,
} from "./RegionSelect";
import { URLContext } from "@/hooks";
import { fallbackLocale } from "@/locale";
import {
    render,
    screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from "history";
import React from 'react';

describe(`RegionSelect`, () => {
    const ui = (urlContext?: Partial<URLContext>) => withIntlProvider(withURLContext(<RegionSelect/>, {
        ...defaultURLContext,
        ...urlContext,
    }));

    test(`displays Region.primaryText for each region`, () => {
        render(ui());

        regions.forEach(region => expect(screen.getByText(region.primaryText)).toBeInTheDocument());
    });

    test(`displays "Can't find your region" button`, () => {
        render(ui());

        expect(screen.getByText(fallbackLocale.formatMessage({
            id: `region_cantFind`,
        }))).toBeInTheDocument();
    });

    describe(`selecting a different region`, () => {
        const { location } = window;

        beforeAll(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            delete window.location;
            window.location = {
                ...location,
                host: `auth.test.kidsloop.test`,
                protocol: `https:`,
                assign: jest.fn(),
            };
        });

        afterAll(() => {
            window.location = location;
        });

        test(`if a different region is clicked, navigates to that region passing ?ua and ?continue QueryParams`, () => {
            const uaParam = `cordova`;
            const continueParam = encodeURIComponent(`https://hub.alpha.kidsloop.net/#/admin/users`);

            render(ui({
                uaParam,
                continueParam,
            }));

            userEvent.click(screen.getByText(`United Kingdom`));

            expect(window.location.assign).toHaveBeenCalledTimes(1);
            const url = new URL((window.location.assign as jest.MockedFunction<(url: string) => void>).mock.calls[0][0]);
            expect(url.protocol).toBe(`https:`);
            expect(url.hostname).toBe(`auth.kidsloop.co.uk`);
            // TODO: convert to url.pathname once HashRouter has been removed
            expect(url.hash).toBe(`#/signin`);

            const params = new URLSearchParams(url.search);
            expect(params.get(`ua`)).toBe(uaParam);
            expect(params.get(`continue`)).toBe(continueParam);
        });
    });

    describe(`selecting the current region`, () => {
        let india: Region;

        beforeAll(() => {
            const region = regions.find(r => r.primaryText === `India`);
            if (!region) throw new Error(`Can't find India region`);
            india = region;
        });

        test(`if the current region is clicked, navigates to /signin on the current domain`, () => {
            const history = createMemoryHistory();
            render(withRouter(ui({
                hostName: india.domain,
            }), history));

            userEvent.click(screen.getByText(india.primaryText));

            expect(history.location.pathname).toBe(`/signin`);
        });
    });

    describe(`clicking "Can't find your region"`, () => {
        const domain = `auth.test.kidsloop.test`;
        const { location } = window;

        beforeAll(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            delete window.location;
            window.location = {
                ...location,
                host: domain,
            };
        });

        afterAll(() => {
            window.location = location;
        });

        test(`if "Can't find your region" is clicked", navigates to /signin on the current domain`, () => {
            const history = createMemoryHistory();
            render(withRouter(ui({
                hostName: domain,
            }), history));

            userEvent.click(screen.getByText(fallbackLocale.formatMessage({
                id: `region_cantFind`,
            })));

            expect(history.location.pathname).toBe(`/signin`);
        });
    });
});
