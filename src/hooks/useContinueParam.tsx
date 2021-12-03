import {
    URLContext,
    useURLContext,
} from "@/hooks";

export default function useContinueParam (): URLContext["continueParam"] {
    return useURLContext()?.continueParam;
}
