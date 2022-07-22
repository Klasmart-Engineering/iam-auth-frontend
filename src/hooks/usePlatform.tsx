import { useAuthfeStore } from "@/hooks";

export type Platform = "Android" | "iOS" | "Browser"

export default function usePlatform (): Platform {
    const feStore = useAuthfeStore();
    switch (feStore.uaParam) {
        case `cordova`:
            return `Android`;
        case `cordovaios`:
            return `iOS`;
        default:
            return `Browser`;
    }
}
