export enum ProjectType {
  Scrum = "Scrum",
  Kanban = "Kanban",
}

export enum UserRole {
  Employee = "Employee",
  Manager = "Manager",
  Admin = "Admin",
}

export interface IProject {
  id: string;
  name: string;
  type: ProjectType;
  startAt: string;
  role: UserRole;
}

export interface IProjectUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
