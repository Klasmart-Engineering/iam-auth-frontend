import { Platform } from "@/hooks";
import {
    base64Decode,
    base64Encode,
} from "@/utils/encoding";

export type OAuthLoginState = {
    platform: Platform;
}

export type OAuthLogoutState = {
    identityProvider: string;
}

type OAuthState = OAuthLoginState | OAuthLogoutState

class OAuthStateFormatError extends Error {
    constructor () {
        super(`Invalid OAuthState`);
        this.name = `OAuthStateFormatError`;
    }
}

export const encodeState = (state: OAuthState) => base64Encode(JSON.stringify(state));

export const decodeLoginState = (encodedState: string): OAuthLoginState => JSON.parse(base64Decode(encodedState));

const isValidLogoutState = (state: unknown): state is OAuthLogoutState => {
    return (!!state && typeof state === `object` && typeof (state as Record<string, unknown>)[`identityProvider`] === `string`);
};

export const decodeLogoutState = (encodedState: string): OAuthLogoutState => {
    let decodedState;
    try {
        decodedState = JSON.parse(base64Decode(encodedState));
    } catch (e) {
        throw new OAuthStateFormatError();
    }

    if (!isValidLogoutState(decodedState)) {
        throw new OAuthStateFormatError();
    }

    return decodedState;
};
