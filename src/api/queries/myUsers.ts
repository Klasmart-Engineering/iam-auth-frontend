import { gql } from "@apollo/client";
import { User } from "./me";

export interface GetMyUsersResponse {
    my_users: User[];
}

export const MY_USERS = gql`
    query {
        my_users {
            user_id
            full_name
            given_name
            family_name
            email
            phone
            date_of_birth
            avatar
            username
        }
    }
`;