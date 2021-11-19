import { useURLContext } from "@/hooks";

export type Platform = "Android" | "iOS" | "Browser"

export default function usePlatform (): Platform {
    const urlContext = useURLContext();
    switch (urlContext.uaParam) {
    case `cordova`:
        return `Android`;
    case `cordovaios`:
        return `iOS`;
    default:
        return `Browser`;
    }
}
