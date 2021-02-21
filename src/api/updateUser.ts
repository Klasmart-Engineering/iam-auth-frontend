import {
    MutationHookOptions,
    useMutation,
} from "@apollo/client";
import { 
    UPDATE_USER, 
    UpdateUserRequest,
    UpdateUserResponse 
} from "./mutations/updateUser";
import { refreshToken } from "./restapi";

export const updateUser = (options?: MutationHookOptions<UpdateUserResponse, UpdateUserRequest>) => {
    refreshToken();
    return useMutation<UpdateUserResponse, UpdateUserRequest>(UPDATE_USER, options);
};
