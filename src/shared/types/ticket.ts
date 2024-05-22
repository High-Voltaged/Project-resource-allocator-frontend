import { IUser } from "./user";

export enum TicketStatus {
  backlog = "backlog",
  todo = "todo",
  inprogress = "inprogress",
  testing = "testing",
  complete = "complete",
}

export enum TicketPriority {
  lowest = "lowest",
  low = "low",
  medium = "medium",
  high = "high",
  highest = "highest",
}

export enum SkillLevel {
  Beginner,
  Intermediate,
  Proficient,
}

export interface ITicket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  projectId: string;
  dueTo?: Date;
  reporter: IUser;
  assignees?: IUser[];
  skills?: ISkill[];
}

export interface ISkill {
  id: string;
  name: string;
}

export interface UserSkill {
  name: string;
  level: SkillLevel;
}

export interface ITicketUser {
  userId: string;
  ticketId: string;
}

export interface UpdateTicketSkillsInput {
  skills: UserSkill[];
  ticketId: string;
}

export interface RemoveTicketSkillsInput {
  skillNames: string[];
  ticketId: string;
}

export interface IAllocationResult {
  ticket: { title: string };
  user: { email: string };
}

export interface IAllocationOutput {
  allocationIds: string[];
  allocations: IAllocationResult[];
}

export interface IConfirmOrCancelAllocationInput {
  allocationIds: string[];
  confirmed: boolean;
}
