import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    registerUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    result: loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;
