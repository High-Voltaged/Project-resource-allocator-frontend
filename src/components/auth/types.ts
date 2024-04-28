import { MutationOutput } from "~/shared/types";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginOutputData {
  accessToken: string;
}

export type TLoginOutput = MutationOutput<ILoginOutputData>;

export interface IRegisterInput extends ILoginInput {
  firstName: string;
  lastName: string;
}
