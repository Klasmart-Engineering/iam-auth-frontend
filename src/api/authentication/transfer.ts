import {
    HttpError,
    HttpStatus,
} from "@/api/http";
import {
    DEFAULT_HEADERS,
    post,
} from "@/api/rest";
import { tracing } from "@/utils/tracing";

export const transferAMSToken = async (token: string): Promise<boolean> => {
    try {
        const response = await post(`/transfer`, {
            body: JSON.stringify({
                token,
            }),
        });
        if (response.status !== HttpStatus.OK) {
            tracing.error(new HttpError(response.status));
        }
        return response.ok;
    } catch (e) {
        console.error(e);
        tracing.error(e);
        return false;
    }
};

export const transferAzureB2CToken = async (token: string, abortController: AbortController): Promise<boolean> => {
    try {
        const response = await post(`/transfer`, {
            headers: new Headers({
                ...DEFAULT_HEADERS,
                Authorization: `Bearer ${token}`,
            }),
            signal: abortController.signal,
        });
        if (response.status !== HttpStatus.OK) {
            tracing.error(new HttpError(response.status));
        }
        return response.ok;
    } catch (e) {
        console.error(e);
        tracing.error(e);
        return false;
    }
};
