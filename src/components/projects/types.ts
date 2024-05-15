import { QueryOutput } from "~/shared/types";
import { IProject, ProjectType } from "~/shared/types/project";

export interface ICreateProjectInput {
  name: string;
  type: ProjectType;
}

export type TCreateProjectOutput = QueryOutput<IProject>;
