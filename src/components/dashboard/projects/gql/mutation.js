import { gql } from "react-apollo";

//Projects

export const CREATE_PROJECT = gql`
  mutation createProject($title: String!) {
    createProject(title: $title) {
      error
      project {
        id
        title
      }
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation editProject($id: String!, $title: String!) {
    editProject(id: $id, title: $title) {
      error
      project {
        id
        title
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      error
      id
    }
  }
`;

// Offers

export const CREATE_OFFER = gql`
  mutation createPixel($projectId: String!, $title: String!) {
    createPixel(projectId: $projectId, title: $title) {
      error
      pixel {
        id
        title
        saveClientData
        code
      }
    }
  }
`;

export const EDIT_OFFER = gql`
  mutation editPixel($id: String!, $title: String!, $saveClientData: Boolean) {
    editPixel(id: $id, title: $title, saveClientData: $saveClientData) {
      error
      pixel {
        id
        title
        saveClientData
        code
      }
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation deletePixel($id: String!) {
    deletePixel(id: $id) {
      error
      id
    }
  }
`;
