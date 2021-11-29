import {
    DEFAULT_HEADERS,
    post,
} from "@/api/rest";

export const transferAMSToken = async (token: string): Promise<boolean> => {
    try {
        const response = await post(`/transfer`, {
            body: JSON.stringify({
                token,
            }),
        });
        return response.ok;
    } catch (e) {
        console.error(e);
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
        return response.ok;
    } catch (e) {
        console.error(e);
        return false;
    }
};
