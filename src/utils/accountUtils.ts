import { useHistory } from "react-router-dom";

interface User {
    avatar: string;
    email: string;
    user_id: string;
    user_name: string;
}

export async function redirectIfUnauthorized () {
    const history = useHistory();
    const GET_SELF = `query {
        me {
            avatar
            email
            user_id
            user_name
        }
    }`;

    const headers = new Headers();
    headers.append(`Accept`, `application/json`);
    headers.append(`Content-Type`, `application/json`);
    await fetch(`${process.env.API_ENDPOINT}user/`, {
        body: JSON.stringify({
            query: GET_SELF,
        }),
        credentials: `include`,
        headers,
        method: `POST`,
    })
        .then(r => r.json())
        .then(data => {
            const response = data;
            console.log(`response: `, response);
            const me: User = response.data.me;
            console.log(`me: `, me);
            if (me === null) {
                if ((window.location.origin + `/`) === process.env.AUTH_ENDPOINT) {
                    if (history.length > 1) {
                        history.goBack();
                    } else {
                        history.push(`/`);
                    }
                }
            }
            return;
        });
}
