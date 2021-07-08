import {
    GetUserInformationRequest,
    GetUserInformationResponse,
    USER,
} from "./queries/user";
import {
    QueryHookOptions,
    useQuery,
} from "@apollo/client";

export const getUserInformation = (options?: QueryHookOptions<GetUserInformationResponse, GetUserInformationRequest>) => {
    return useQuery<GetUserInformationResponse, GetUserInformationRequest>(USER, options);
};
