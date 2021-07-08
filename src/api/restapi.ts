export async function transferSession (token: string) {
    try {
        const headers = new Headers();
        headers.append(`Accept`, `application/json`);
        headers.append(`Content-Type`, `application/json`);
        const response = await fetch(`/transfer`, {
            body: JSON.stringify({
                token,
            }),
            headers,
            method: `POST`,
        });
        console.log(response);
        return response.ok;
    } catch(e) {
        console.error(e);
        return false;
    }
}

export async function refreshToken () {
    try {
        const headers = new Headers();
        headers.append(`Accept`, `application/json`);
        headers.append(`Content-Type`, `application/json`);
        const request = await fetch(`/refresh`, {
            credentials: `include`,
            headers,
            method: `GET`,
        });
        return request.ok;
    } catch (e) {
        console.error(`refreshToken`, e);
        return false;
    }
}

export async function switchUser (userId: string, retry = true): Promise<boolean> {
    try {
        const headers = new Headers();
        headers.append(`Accept`, `application/json`);
        headers.append(`Content-Type`, `application/json`);
        const response = await fetch(`/switch`, {
            body: JSON.stringify({
                user_id: userId,
            }),
            credentials: `include`,
            headers,
            method: `POST`,
        });
        await response.text();
        return response.ok;
    } catch(e) {
        if(!retry) { return false; }
        await refreshToken();
        return switchUser(userId, false);
    }
}
