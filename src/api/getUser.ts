import {
    QueryHookOptions,
    useQuery,
} from "@apollo/client";
import { USER, GetUserInformationResponse, GetUserInformationRequest } from "./queries/user";
import { refreshToken } from "./restapi";

export const getUserInformation = (options?: QueryHookOptions<GetUserInformationResponse, GetUserInformationRequest>) => {
    return useQuery<GetUserInformationResponse, GetUserInformationRequest>(USER, options);
};
