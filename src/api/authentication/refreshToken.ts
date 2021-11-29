import { get } from "@/api/rest";

export const refreshToken = async (): Promise<boolean> => {
    try {
        const response = await get(`/refresh`, {
            credentials: `include`,
        });
        return response.ok;
    } catch(e) {
        console.error(e);
        return false;
    }
};
