import gql from "react-apollo";

/*
GraphQL Queries used along side of project
*/

const Query = {
	CURRENT_USER: gql`
		{
			user {
				id
				username
			}
		}
	`
};
