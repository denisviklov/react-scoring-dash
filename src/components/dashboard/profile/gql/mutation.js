import { gql } from "react-apollo";

const UPDATE_PROFILE = gql`
	mutation updateUserProfile(
		$firstName: String
		$lastName: String
		$companyName: String!
		$phone: String
		$position: String
		$site: String
		$country: String
		$address: String
		$industry: String
		$business: String
	) {
		data: updateUserProfile(
			firstName: $firstName
			lastName: $lastName
			companyName: $companyName
			phone: $phone
			position: $position
			site: $site
			address: $address
			industry: $industry
			country: $country
			business: $business
		) {
			profile {
				companyName
			}
		}
	}
`;

export default UPDATE_PROFILE;
