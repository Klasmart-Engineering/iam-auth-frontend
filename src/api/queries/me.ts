import { gql } from "@apollo/client";

export interface User {
    user_id: string;
    full_name?: string | null;
    given_name?: string | null;
    family_name?: string | null;
    email?: string | null;
    phone?: string | null;
    date_of_birth?: string | null;
    avatar?: string | null;
    username?: string | null;
}

export interface GetMyInformationResponse {
    me: User;
}

export const ME = gql`
    query me {
        me {
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