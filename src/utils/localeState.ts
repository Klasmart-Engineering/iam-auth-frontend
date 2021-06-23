import { useMemo } from "react";
import { useLocation } from "react-router";

export function useLocaleState() {
    const location: any = useLocation();

    const languageCode = useMemo<string>(() => {
        const url = new URL(window.location.href);
        const locale = url.searchParams.get("locale");
        return locale ?? location?.state?.locale ?? "en";
    }, [location, window.location]);

    return { locale: languageCode };
};