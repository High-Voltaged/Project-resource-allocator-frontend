import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query myProjects {
    result: myProjects {
      id
      name
      type
      startAt
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
