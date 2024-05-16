import { gql } from "@apollo/client";

export const GET_MY_PROJECTS = gql`
  query myProjects {
    result: myProjects {
      id
      name
      type
      startAt
      role
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $type: ProjectType!) {
    result: createProject(name: $name, type: $type) {
      id
      name
      type
      startAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: String!, $name: String, $type: ProjectType) {
    result: updateProject(id: $id, name: $name, type: $type) {
      id
      name
      type
      startAt
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    result: deleteProject(id: $id)
  }
`;
