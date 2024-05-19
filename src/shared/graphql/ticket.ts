import { gql } from "@apollo/client";

export const GET_TICKETS_BY_PROJECT_ID = gql`
  query ticketsByProjectId($id: String!) {
    result: ticketsByProjectId(id: $id) {
      id
      title
      status
      priority
      dueTo
      reporter {
        firstName
        lastName
      }
    }
  }
`;

export const GET_TICKET_BY_ID = gql`
  query ticketById($id: String!) {
    result: ticketById(id: $id) {
      id
      title
      status
      priority
      dueTo
      assignees {
        firstName
        lastName
      }
      skills {
        name
        level
      }
    }
  }
`;

export const UPDATE_TICKET_SKILLS = gql`
  mutation updateTicketSkills($skills: [SkillInput!], $ticketId: String!) {
    updateTicketSkills(skills: $skills, ticketId: $ticketId)
  }
`;

export const CREATE_TICKET = gql`
  mutation createTicket(
    $title: String!
    $description: String!
    $status: TicketStatus!
    $priority: TicketPriority!
    $dueTo: DateTime
    $projectId: String!
  ) {
    result: createTicket(
      title: $title
      description: $description
      status: $status
      priority: $priority
      dueTo: $dueTo
      projectId: $projectId
    ) {
      id
      title
      description
      status
      priority
      dueTo
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation updateTicket(
    $id: String!
    $title: String
    $description: String
    $status: TicketStatus
    $priority: TicketPriority
    $dueTo: DateTime
  ) {
    result: updateTicket(
      id: $id
      title: $title
      description: $description
      status: $status
      priority: $priority
      dueTo: $dueTo
    ) {
      id
      title
      description
      status
      priority
      dueTo
      projectId
    }
  }
`;

export const GET_SKILLS = gql`
  query skills {
    result: skills {
      id
      name
    }
  }
`;
