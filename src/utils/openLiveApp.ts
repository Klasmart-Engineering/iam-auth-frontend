import { Locale } from "@/locale";
import {
    Domain,
    DOMAINS,
} from "@/pages/RegionSelect";
interface OpenLiveAppOptions {
    token: string;
    domain: string;
    locale: Locale;
}

export const openLiveApp = ({
    token,
    domain,
    locale,
}: OpenLiveAppOptions) => {
    // TODO (axel): `iso` parameter there for backwards compatibility. Remove it once app is updated to support `locale` instead.
    const queryString = new URLSearchParams(([
        ['token', token],
        ['iso', locale],
        ['locale', locale],
        ...DOMAINS.includes(domain as Domain) ? [
            'region', domain
        ] : []
    ] as string[][] | []).filter(Boolean)).toString()

    window.open(`kidsloopstudent://?${queryString}`, `_system`);
}
