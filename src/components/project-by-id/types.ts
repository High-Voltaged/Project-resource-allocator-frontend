import { QueryOutput } from "~/shared/types";
import { ITicket, TicketStatus } from "~/shared/types/ticket";

export interface ITicketValidationInput {
  title: string;
  description: string;
  status: TicketStatus;
  priority: string;
  dueTo?: Date | null;
}

export interface IUpdateTicketInput extends ITicketValidationInput {
  id: string;
}
export interface ICreateTicketInput extends ITicketValidationInput {
  projectId: string;
}

export type TUpsertTicketInput = IUpdateTicketInput | ICreateTicketInput;

export type TCreateTicketOutput = QueryOutput<ITicket>;
