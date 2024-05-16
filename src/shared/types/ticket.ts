export enum TicketStatus {
  backlog = "backlog",
  todo = "todo",
  inprogress = "inprogress",
  testing = "testing",
  complete = "complete",
}

export interface ITicket {
  id: string;
  name: string;
  description: string;
  status: TicketStatus;
  priority: number;
  dueTo: string;
}
