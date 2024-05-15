import * as yup from "yup";
import { USER_INPUT_LIMITS } from "~/shared/const/user";
import { ILoginInput, IRegisterInput } from "./types";

export const initialRegisterValues: IRegisterInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const initialLoginValues: ILoginInput = {
  email: "",
  password: "",
};

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(USER_INPUT_LIMITS.USERNAME_MIN)
    .max(USER_INPUT_LIMITS.USERNAME_MAX)
    .required("First name is required"),
  lastName: yup
    .string()
    .min(USER_INPUT_LIMITS.USERNAME_MIN)
    .max(USER_INPUT_LIMITS.USERNAME_MAX)
    .required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(USER_INPUT_LIMITS.PASSWORD_MIN)
    .max(USER_INPUT_LIMITS.PASSWORD_MAX)
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(USER_INPUT_LIMITS.PASSWORD_MIN)
    .max(USER_INPUT_LIMITS.PASSWORD_MAX)
    .required("Password is required"),
});
