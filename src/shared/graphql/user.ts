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

export const UPDATE_MY_PROFILE = gql`
  mutation updateMyProfile($email: String, $firstName: String, $lastName: String, $isAvailable: Boolean) {
    result: updateMyProfile(email: $email, firstName: $firstName, lastName: $lastName, isAvailable: $isAvailable) {
      id
      email
      firstName
      lastName
      isAvailable
    }
  }
`;
