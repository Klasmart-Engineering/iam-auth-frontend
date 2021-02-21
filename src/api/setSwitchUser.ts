import {
    MutationHookOptions,
    useMutation,
} from "@apollo/client";
import { SWITCH_USER, SetSwitchUserRequest, SetSwitchUserResponse } from "./mutations/switchUser";
import { refreshToken } from "./restapi";

export const setSwitchUser = (options?: MutationHookOptions<SetSwitchUserResponse, SetSwitchUserRequest>) => {
    refreshToken();
    console.log(`switched users`)
    return useMutation<SetSwitchUserResponse, SetSwitchUserRequest>(SWITCH_USER, options);
};
