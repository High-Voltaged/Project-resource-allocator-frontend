import { PaginatedType, PaginationArgs, QueryOutput } from "~/shared/types";
import { IProject, IProjectUser, ProjectType, UserRole } from "~/shared/types/project";

export interface ICreateProjectInput {
  name: string;
  type: ProjectType;
}

export interface IUpdateProjectInput extends ICreateProjectInput {
  id: string;
}

export type TCreateProjectOutput = QueryOutput<IProject>;

export interface IAddProjectUserInput {
  email: string;
  projectId: string;
  role: UserRole;
}

export interface IMembersListVars extends PaginationArgs {
  projectId: string;
}

export type TMyProjectsPaginatedOutput = QueryOutput<PaginatedType<IProject>>;
export type TProjectUsersPaginatedOutput = QueryOutput<PaginatedType<IProjectUser>>;
