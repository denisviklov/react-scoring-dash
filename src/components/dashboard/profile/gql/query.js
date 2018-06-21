import { gql } from "react-apollo";

const USER_PROFILE = gql`
    query {
        data: userProfile {
            id
            companyName
            user {
                firstName
                lastName
            }
            phone
            country
            position
            site
            country
            address
            industry
            business
        }
    }
`;

const COUNTRIES = gql`
    query {
        countries: countries
    }
`;

export { COUNTRIES, USER_PROFILE };
