import { refreshToken } from "@/api/authentication";
import config from "@/config";
import { client } from "@/utils/azureB2C";
import {
    useEffect,
    useState,
} from "react";
import { useHistory } from "react-router";

export default function useConditionalLogoutFromB2C () {
    const [ loading, setLoading ] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        const callLogoutFromB2C = async () => {
            try {
                setLoading(true);

                const isAuthenticated = await refreshToken();
                if (!isAuthenticated) {
                    const accounts = client.getAllAccounts();

                    if (accounts.length) {
                        await client.logoutRedirect();
                    }
                }
            } catch (error) {
                console.error(error);

                history.push(`/error`);
            } finally {
                setLoading(false);
            }
        };
        if (config.azureB2C.enabled) {
            callLogoutFromB2C();
        }
    }, [ history ]);

    return {
        loading,
    };

}
