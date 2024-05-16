import { TicketStatus } from "~/shared/types/ticket";

export const TicketStatusColors = {
  [TicketStatus.backlog]: "orange",
  [TicketStatus.todo]: "indigo",
  [TicketStatus.inprogress]: "yellow",
  [TicketStatus.testing]: "blue",
  [TicketStatus.complete]: "green",
};
