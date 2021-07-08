import {
    UPDATE_USER,
    UpdateUserRequest,
    UpdateUserResponse,
} from "./mutations/updateUser";
import {
    MutationHookOptions,
    useMutation,
} from "@apollo/client";

export const updateUser = (options?: MutationHookOptions<UpdateUserResponse, UpdateUserRequest>) => {
    return useMutation<UpdateUserResponse, UpdateUserRequest>(UPDATE_USER, options);
};
