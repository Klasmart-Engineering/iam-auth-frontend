import {
    QueryHookOptions,
    useQuery,
} from "@apollo/client";
import { User } from "./queries/me";
import { GetMyUsersResponse, MY_USERS } from "./queries/myUsers";
import { refreshToken } from "./restapi";

export const myUserSampleResponse: GetMyUsersResponse = {"my_users": [{"user_id":"f2626a21-3e98-517d-ac4a-ed6f33231869","full_name":null,"given_name":null,"family_name":null,"email":"pj.williams@calmid.com","phone":null,"date_of_birth":null,"avatar":null},{"user_id":"14494c07-0d4f-5141-9db2-15799993f448","full_name":"PJ Williams","given_name":"PJ","family_name":"Williams","email":"pj.williams@calmid.com","phone":null,"date_of_birth":null,"avatar":null}]}

export const getMyUsers = (options?: QueryHookOptions<GetMyUsersResponse>) => {
    refreshToken();
    return useQuery<GetMyUsersResponse>(MY_USERS, options);
};
