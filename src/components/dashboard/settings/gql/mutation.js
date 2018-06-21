import { gql } from "react-apollo";

const UPDATE_PASSWORD = gql`
	mutation updatePassword(
		$currentPassword: String!
		$password: String!
		$confirmPassword: String
	) {
		data: updatePassword(
			currentPassword: $currentPassword
			password: $password
			confirmPassword: $confirmPassword
		) {
			success
			error
		}
	}
`;

export default UPDATE_PASSWORD;
