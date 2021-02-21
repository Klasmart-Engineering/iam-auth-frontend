import { gql } from "@apollo/client";

export interface User {
    user_id: string;
    full_name: string;
    given_name: string | null;
    family_name: string | null;
    email: string | null;
    phone: string | null;
    date_of_birth: string | null;
    avatar: string | null;
    username: string | null;
    memberships: Membership[];
}

export interface Membership {
    organization_id: string;
    organization: { organization_name: string };
    roles: { role_id: string };
}

export interface GetUserInformationRequest {
    user_id: string;
}

export interface GetUserInformationResponse {
    user: User;
}

export const USER = gql`
    query user(
        $user_id: ID!
    ) {
        user(
            user_id: $user_id
        ) {
            user_id
            given_name
            family_name
            email
            phone
            avatar
            date_of_birth
            username
            memberships {
                organization_id
                organization {
                    organization_name
                }
                roles {
                    role_id
                }
            }
        }
    }
`;
