import {
    loadIntl,
    Locale,
} from "@/locale";
import React,
{ useMemo } from "react";
import { RawIntlProvider } from "react-intl";

interface Props {
    children?: React.ReactNode;
    locale: Locale;
}

export default function IntlProvider ({ children, locale }: Props) {
    const intl = useMemo(() => {
        return loadIntl(locale);
    }, [ locale ]);

    return (
        <RawIntlProvider value={intl}>
            {children}
        </RawIntlProvider>
    );
}
