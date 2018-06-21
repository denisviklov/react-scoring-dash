import { gql, graphql } from "react-apollo";

const FLATPAGES_QUERY = gql`
	query {
		flatpages: allXflatpages {
			url
			title
			titleRu
		}
	}
`;

const withFlatpages = graphql(FLATPAGES_QUERY);

export default withFlatpages;
