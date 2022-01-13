import { fallbackLocale } from "@/locale";
import { render } from "@testing-library/react";
import React from "react";
import {
    createIntl,
    createIntlCache,
    RawIntlProvider,
} from "react-intl";

const mockIntlCache = createIntlCache();

export const mockOnTranslationError = jest.fn(console.error);

export const mockIntl = createIntl({
    locale: fallbackLocale.locale,
    messages: fallbackLocale.messages,
    onError: mockOnTranslationError,
}, mockIntlCache);

export const withMockIntl = (ui: React.ReactNode) => <RawIntlProvider value={mockIntl}>{ui}</RawIntlProvider>;

export const renderWithIntl = (ui: React.ReactNode) => render(withMockIntl(ui));
