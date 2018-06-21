import { gql } from "react-apollo";

export const REGISTER_USER = gql`
  mutation registerUser(
    $companyName: String!
    $username: String!
    $password: String!
    $agreement: Boolean!
    $name: String
    $phone: String
  ) {
    registerUser(
      companyName: $companyName
      username: $username
      password: $password
      agreement: $agreement
      name: $name
      phone: $phone
    ) {
      user {
        id
      }
      error
    }
  }
`;

export const CONFIRM_BY_CODE = gql`
  mutation confirmByCode($activationCode: String!) {
    confirmByCode(code: $activationCode) {
      user {
        id
      }
      token
      error
    }
  }
`;
export const CONFIRM_BY_CODE_HASH = gql`
  mutation confirmByCodeHash($activationCodeHash: String!) {
    confirmByCodeHash(codeHash: $activationCodeHash) {
      user {
        id
      }
      token
      error
    }
  }
`;
