import { Platform } from "@/hooks";
import {
    base64Decode,
    base64Encode,
} from "@/utils/encoding";

export type OAuthLoginState = {
    platform: Platform;
}

export const encodeState = (state: OAuthLoginState) => base64Encode(JSON.stringify(state));

export const decodeState = <T extends OAuthLoginState>(encodedState: string): T => JSON.parse(base64Decode(encodedState));
