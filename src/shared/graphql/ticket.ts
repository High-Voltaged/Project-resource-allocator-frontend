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
      description
      status
      priority
      dueTo
      projectId
      reporter {
        firstName
        lastName
        email
      }
      assignees {
        id
        email
        firstName
        lastName
      }
      skills {
        id
        name
      }
    }
  }
`;

export const UPDATE_TICKET_SKILLS = gql`
  mutation updateTicketSkills($skills: [SkillInput!], $ticketId: String!) {
    updateTicketSkills(skills: $skills, ticketId: $ticketId)
  }
`;

export const REMOVE_TICKET_SKILLS = gql`
  mutation removeTicketSkills($skillNames: [String!]!, $ticketId: String!) {
    removeTicketSkills(skillNames: $skillNames, ticketId: $ticketId)
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
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation deleteTicket($id: String!) {
    deleteTicket(id: $id)
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

export const ADD_SKILL = gql`
  mutation addSkill($name: String!) {
    result: addSkill(name: $name)
  }
`;

export const ASSIGN_TICKET_TO_UESR = gql`
  mutation assignTicketToUser($userId: String!, $ticketId: String!) {
    result: assignTicketToUser(userId: $userId, ticketId: $ticketId)
  }
`;

export const UNASSIGN_TICKET_FROM_USER = gql`
  mutation unassignTicketFromUser($userId: String!, $ticketId: String!) {
    result: unassignTicketFromUser(userId: $userId, ticketId: $ticketId)
  }
`;
