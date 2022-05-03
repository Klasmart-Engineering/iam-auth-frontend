import { refreshToken } from "./refreshToken";
import {
    HttpError,
    HttpStatus,
} from "@/api/http";
import { post } from "@/api/rest";
import { tracing } from "@/utils/tracing";

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
        if (response.status !== HttpStatus.OK) {
            tracing.error(new HttpError(response.status), {
                userId,
            });
        }
        return response.ok;
    } catch(e) {
        console.error(e);
        tracing.error(e, {
            userId,
        });
        return false;
    }
};
