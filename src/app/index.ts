import { Locale } from "@/locale";
import {
    Domain,
    DOMAINS,
} from "@/pages/RegionSelect";
import QueryString from "query-string";

interface OpenLiveAppOptions {
    token: string;
    domain: string;
    locale: Locale;
}

interface LiveAppQueryParams {
    token: string;
    region?: string;
    locale: string;
    iso: string;
}

export function openLiveApp (options: OpenLiveAppOptions) {
    const {
        token,
        domain,
        locale,
    } = options;

    // TODO (axel): `iso` parameter there for backwards compatibility. Remove it once app is updated to support `locale` instead.
    const queryParams: LiveAppQueryParams = {
        token: token,
        iso: locale,
        locale: locale,
    };

    if (DOMAINS.includes(domain as Domain)) {
        queryParams.region = domain;
    }
    const queryString = QueryString.stringify(queryParams);
    window.open(`kidsloopstudent://?${queryString}`, `_system`);
}
