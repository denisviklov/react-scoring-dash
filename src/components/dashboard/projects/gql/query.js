import { gql } from "react-apollo";

export const ALL_PROJECTS = gql`
  query allProjects {
    allProjects {
      id
      title
    }
  }
`;

export const PROJECT_WITH_PIXELS = gql`
  query project($id: String!) {
    project(id: $id) {
      id
      title
      pixels {
        id
        title
        code
        saveClientData
      }
    }
  }
`;
