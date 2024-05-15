export enum ProjectType {
  Scrum = "Scrum",
  Kanban = "Kanban",
}

export enum ProjectRole {
  Employee,
  Admin,
}

export interface IProject {
  id: string;
  name: string;
  type: ProjectType;
  startAt: string;
  role: ProjectRole;
}
