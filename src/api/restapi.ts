export async function refreshToken() {
    try {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        const request = await fetch(`/refresh`, {
            credentials: "include",
            headers,
            method: "GET",
        });

        if (!request.ok) {
            return;
        }
        const response = await request.json();
        return response;
    } catch (e) {
        console.error(e);
    }
}
