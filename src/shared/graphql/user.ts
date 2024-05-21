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

export const GET_MY_PROFILE = gql`
  query getMyProfile {
    result: myProfile {
      id
      firstName
      lastName
      email
      isAvailable
      skills {
        id
        name
      }
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

export const UPDATE_MY_SKILLS = gql`
  mutation updateMySkills($skills: [SkillInput!]) {
    updateMySkills(skills: $skills)
  }
`;

export const REMOVE_MY_SKILLS = gql`
  mutation removeMySkills($skillNames: [String!]!) {
    removeMySkills(skillNames: $skillNames)
  }
`;
