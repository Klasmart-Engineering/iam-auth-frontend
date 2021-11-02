import {
    DEFAULT_HEADERS,
    get,
    post,
} from "@/api/rest";

export async function transferAMSToken (token: string): Promise<boolean> {
    try {
        const response = await post(`/transfer`, {
            body: JSON.stringify(token),
        });
        return response.ok;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function transferAzureB2CToken (token: string, abortController: AbortController): Promise<boolean> {
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
}

export async function refreshToken (): Promise<boolean> {
    try {
        const response = await get(`/refresh`, {
            credentials: `include`,
        });
        return response.ok;
    } catch(e) {
        console.error(e);
        return false;
    }
}

export async function switchUser (userId: string, retry = true): Promise<boolean> {
    try {
        const response = await post(`/switch`, {
            body: JSON.stringify({
                user_id: userId,
            }),
            credentials: `include`,
        });
        await response.text();
        return response.ok;
    } catch(e) {
        if(!retry) { return false; }
        await refreshToken();
        return switchUser(userId, false);
    }
}
