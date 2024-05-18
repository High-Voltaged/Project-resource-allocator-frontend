import { QueryOutput } from "~/shared/types";
import { ITicket, TicketStatus } from "~/shared/types/ticket";

export interface ICreateTicketInput {
  title: string;
  description: string;
  status: TicketStatus;
  priority: string;
  projectId: string;
  dueTo?: Date | null;
}

export interface IUpdateTicketInput extends Omit<ICreateTicketInput, "projectId"> {
  id: string;
}

export type TCreateTicketOutput = QueryOutput<ITicket>;
