import { TicketStatus } from "~/shared/types/ticket";

export const TicketStatusItems = {
  [TicketStatus.backlog]: { label: "Backlog", color: "orange" },
  [TicketStatus.todo]: { label: "To do", color: "indigo" },
  [TicketStatus.inprogress]: { label: "In Progress", color: "yellow" },
  [TicketStatus.testing]: { label: "Testing", color: "blue" },
  [TicketStatus.complete]: { label: "Complete", color: "green" },
};
