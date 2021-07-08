import { User } from "../queries/me";
import { gql } from "@apollo/client";

export interface SetSwitchUserRequest {
    user_id: string;
}

export interface SetSwitchUserResponse {
    user: User;
}

export const SWITCH_USER = gql`
    mutation switch_user(
        $user_id: ID!
    ) {
        newUser(
            user_id: $user_id
        ) {
            user {
                user_id
                given_name
                family_name
                date_of_birth
                username
            }
        }
    }
`;
