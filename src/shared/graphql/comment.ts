import { gql } from "@apollo/client";

export const GET_COMMENTS_BY_ID = gql`
  query commentsByTicketId($id: String!) {
    result: commentsByTicketId(id: $id) {
      id
      content
      author {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const ADD_COMMENT_TO_TICKET = gql`
  mutation createComment($ticketId: String!, $content: String!) {
    result: createComment(ticketId: $ticketId, content: $content) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id)
  }
`;
