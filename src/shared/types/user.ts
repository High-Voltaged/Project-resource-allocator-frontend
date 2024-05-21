import { ISkill, UserSkill } from "./ticket";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAvailable: boolean;
  skills?: ISkill[];
}

export interface IUUIDVars {
  id: string;
}

export interface UpdateMySkillsInput {
  skills: UserSkill[];
}

export interface RemoveMySkillsInput {
  skillNames: string[];
}
