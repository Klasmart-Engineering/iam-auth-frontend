import {
    QueryHookOptions,
    useQuery,
} from "@apollo/client";
import { ME, GetMyInformationResponse } from "./queries/me";
import { refreshToken } from "./restapi";

export const getMyInformation = (options?: QueryHookOptions<GetMyInformationResponse>) => {
    refreshToken();
    return useQuery<GetMyInformationResponse>(ME, options);
};
