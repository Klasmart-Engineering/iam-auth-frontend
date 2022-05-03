import {
    HttpError,
    HttpStatus,
} from "@/api/http";
import { get } from "@/api/rest";
import { tracing } from "@/utils/tracing";

export const refreshToken = async (): Promise<boolean> => {
    try {
        const response = await get(`/refresh`, {
            credentials: `include`,
        });
        if (![
            HttpStatus.OK,
            HttpStatus.TEMPORARY_REDIRECT,
            // As this API is used to check if the user is Kidsloop authenticated, including this
            // status code avoids over-reporting errors
            HttpStatus.UNAUTHORIZED,
        ].includes(response.status)) {
            tracing.error(new HttpError(response.status));
        }
        return response.ok;
    } catch(e) {
        console.error(e);
        tracing.error(e);
        return false;
    }
};
