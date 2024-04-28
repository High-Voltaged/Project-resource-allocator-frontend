export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends ILoginInput {
  firstName: string;
  lastName: string;
}
