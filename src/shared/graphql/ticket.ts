import { gql } from "@apollo/client";

export const GET_TICKETS_BY_PROJECT_ID = gql`
  query ticketsByProjectId($id: String!) {
    result: ticketsByProjectId(id: $id) {
      id
      title
      status
      priority
      dueTo
    }
  }
`;
