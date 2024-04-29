import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query getUser($id: String!) {
    result: userById(id: $id) {
      id
      firstName
      lastName
      email
      isAvailable
    }
  }
`;
