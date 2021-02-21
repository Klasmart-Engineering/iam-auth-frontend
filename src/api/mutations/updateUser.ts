import { gql } from "@apollo/client";
import { User } from "../queries/me";

export interface UpdateUserRequest {
    user_id: string;
    given_name: string | null;
    family_name: string | null;
    email: string | null;
    phone: string | null;
    avatar: string | null;
    date_of_birth: string | null;
    username: string | null;
}

export interface UpdateUserResponse {
    user: User;
}

export const UPDATE_USER = gql`
    mutation updateUser(
        $user_id: ID!
        $given_name: String
        $family_name: String
        $email: String
        $phone: String
        $avatar: String
        $date_of_birth: String
        $username: String
    ) {
        user(
            user_id: $user_id
            given_name: $given_name
            family_name: $family_name
            email: $email
            phone: $phone
            avatar: $avatar
            date_of_birth: $date_of_birth
            username: $username
        ) {
            user_id
            given_name
            family_name
            email
            phone
            avatar
            date_of_birth
            username
        }
    }
`;
