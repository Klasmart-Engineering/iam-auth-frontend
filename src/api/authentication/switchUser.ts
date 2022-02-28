import { refreshToken } from "./refreshToken";
import { post } from "@/api/methods";

export const switchUser = async (userId: string): Promise<boolean> => {
    try {
        const response = await post(`/switch`, {
            body: JSON.stringify({
                user_id: userId,
            }),
            credentials: `include`,
            retries: 1,
            retryCondition: async (fetchResult) => {
                if (fetchResult.error) {
                    console.error(fetchResult.error);
                    return true;
                }
                if (fetchResult.response.status === 401) {
                    await refreshToken();
                    return true;
                }
                return !fetchResult.response.ok;
            },
        });
        return response.ok;
    } catch(e) {
        console.error(e);
        return false;
    }
};
