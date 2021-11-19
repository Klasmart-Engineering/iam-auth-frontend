import { Platform } from "@/hooks";
import {
    base64Decode,
    base64Encode,
} from "@/utils/encoding";

export type OAuthState = {
    platform: Platform;
}

export const encodeState = (state: OAuthState) => base64Encode(JSON.stringify(state));

export const decodeState = (encodedState: string): OAuthState => JSON.parse(base64Decode(encodedState));
