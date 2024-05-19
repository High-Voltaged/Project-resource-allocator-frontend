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
  dueTo?: Date;
  reporter: IUser;
  skills?: ISkill[];
}

export interface ISkill {
  id?: string;
  name: string;
}

export interface UserSkill {
  name: string;
  level: SkillLevel;
}
