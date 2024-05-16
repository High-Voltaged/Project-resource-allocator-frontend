import { gql } from "@apollo/client";

export const GET_MY_PROJECTS = gql`
  query myProjects($limit: Int, $offset: Int) {
    result: myProjects(limit: $limit, offset: $offset) {
      items {
        id
        name
        type
        startAt
        role
      }
      count
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query projectById($id: String!) {
    result: projectById(id: $id) {
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

export const ADD_PROJECT_MEMBER = gql`
  mutation addProjectMember($projectId: String!, $email: String!, $role: UserRole!) {
    result: addUserToProject(projectId: $projectId, email: $email, role: $role)
  }
`;

export const PROJECT_USERS = gql`
  query projectUsers($projectId: String!, $limit: Int, $offset: Int) {
    result: projectUsers(projectId: $projectId, limit: $limit, offset: $offset) {
      items {
        id
        lastName
        firstName
        email
        role
      }
      count
    }
  }
`;
