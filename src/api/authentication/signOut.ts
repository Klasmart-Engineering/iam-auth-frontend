import { get } from "@/api/rest";

export const signOut = async (): Promise<boolean> => {
    try {
        const response = await get(`/signout`, {
            credentials: `include`,
        });
        return response.ok;
    } catch(e) {
        console.error(e);
        return false;
    }
};
