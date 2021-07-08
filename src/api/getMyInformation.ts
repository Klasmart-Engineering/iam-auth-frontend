import {
    GetMyInformationResponse,
    ME,
} from "./queries/me";
import {
    QueryHookOptions,
    useQuery,
} from "@apollo/client";

export const getMyInformation = (options?: QueryHookOptions<GetMyInformationResponse>) => {
    return useQuery<GetMyInformationResponse>(ME, options);
};
