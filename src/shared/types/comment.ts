import { IUser } from "./user";

export interface IComment {
  id: string;
  content: string;
  author: IUser;
  ticketId?: string;
  createdAt: string;
}
