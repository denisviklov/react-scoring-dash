import { gql } from "react-apollo";

export const PASSWORD_RECOVERY = gql`
  mutation recovery($username: String!) {
    recovery(username: $username) {
      success
      error
    }
  }
`;
export const RECOVER_BY_CODE = gql`
  mutation recoverByCode(
    $recoveryCode: String!
    $password: String = ""
    $confirmPassword: String = ""
  ) {
    recoverByCode(
      code: $recoveryCode
      password: $password
      confirmPassword: $confirmPassword
    ) {
      user {
        id
      }
      token
      error
    }
  }
`;

export const RECOVER_BY_CODE_HASH = gql`
  mutation recoverByCodeHash(
    $recoveryCodeHash: String!
    $password: String = ""
    $confirmPassword: String = ""
  ) {
    recoverByCodeHash(
      codeHash: $recoveryCodeHash
      password: $password
      confirmPassword: $confirmPassword
    ) {
      user {
        id
      }
      token
      error
    }
  }
`;
