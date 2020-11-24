import queryString from "query-string";

interface User {
    avatar: string,
    email: string,
    user_id: string,
    user_name: string,
}

export async function redirectIfUnauthorized(continueParam?: string) {
    const GET_SELF = `query {
        me { 
            avatar
            email
            user_id
            user_name
        }
    }`

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    const response = await fetch(`${process.env.API_ENDPOINT}user/`, {
        body: JSON.stringify({ query: GET_SELF }),
        credentials: "include",
        headers,
        method: "POST",
    })
        .then(r => r.json())
        .then(data => {
            const response = data;
            console.log(response);
            const me: User = response.data.me;
            console.log(me);
            if (me === null) {
                if ((window.location.origin + "/") === process.env.AUTH_ENDPOINT) { return; }
                const stringifiedQuery = queryString.stringify({ continue: continueParam ? continueParam : window.location.href });
                window.location.href = `${process.env.AUTH_ENDPOINT}?${stringifiedQuery}#/`
            }
            return;
        });
}

