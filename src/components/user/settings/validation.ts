import * as yup from "yup";
import { IUpdateProfileInput } from "./types";
import { USER_INPUT_LIMITS } from "~/shared/const/user";

export const updateProfileSchema = yup.object<IUpdateProfileInput>().shape({
  firstName: yup.string().min(USER_INPUT_LIMITS.USERNAME_MIN).max(USER_INPUT_LIMITS.USERNAME_MAX),
  lastName: yup.string().min(USER_INPUT_LIMITS.USERNAME_MIN).max(USER_INPUT_LIMITS.USERNAME_MAX),
  email: yup.string().email("Invalid email"),
  isAvailable: yup.boolean(),
});
