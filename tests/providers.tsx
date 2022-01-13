import {
    URLContext,
    URLContextProvider,
} from "@/hooks";
import { fallbackLocale } from "@/locale";
import { createMemoryHistory } from "history";
import React from "react";
import { RawIntlProvider } from "react-intl";
import { Router } from "react-router";

export const defaultURLContext: URLContext = {
    hostName: `auth.alpha.kidsloop.net`,
    continueParam: null,
    uaParam: null,
    testing: false,

};

export const withURLContext = (ui: React.ReactNode, value = defaultURLContext) => {
    return <URLContextProvider value={value}>{ui}</URLContextProvider>;
};

export const withIntlProvider = (ui: React.ReactNode, value = fallbackLocale) => {
    return <RawIntlProvider value={value}>{ui}</RawIntlProvider>;
};

export const withRouter = (ui: React.ReactNode, history = createMemoryHistory()) => {
    return <Router history={history}>{ui}</Router>;
};
