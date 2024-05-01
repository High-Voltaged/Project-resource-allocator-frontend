import * as yup from "yup";
import { IUpdateProfileInput } from "./types";
import { LIMIT_VALUES } from "~/shared/const/user";

export const updateProfileSchema = yup.object<IUpdateProfileInput>().shape({
  firstName: yup.string().min(LIMIT_VALUES.USERNAME_MIN).max(LIMIT_VALUES.USERNAME_MAX),
  lastName: yup.string().min(LIMIT_VALUES.USERNAME_MIN).max(LIMIT_VALUES.USERNAME_MAX),
  email: yup.string().email("Invalid email"),
  isAvailable: yup.boolean(),
});
