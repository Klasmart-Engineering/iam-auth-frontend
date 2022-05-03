import {
    HttpError,
    HttpStatus,
} from "@/api/http";
import { get } from "@/api/rest";
import { tracing } from "@/utils/tracing";

export const signOut = async (): Promise<boolean> => {
    try {
        const response = await get(`/signout`, {
            credentials: `include`,
        });
        if (response.status !== HttpStatus.OK) {
            tracing.error(new HttpError(response.status));
        }
        return response.ok;
    } catch(e) {
        console.error(e);
        tracing.error(e);
        return false;
    }
};
