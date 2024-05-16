import * as yup from "yup";

import { ProjectType } from "~/shared/types/project";
import { PROJECT_INPUT_LIMITS } from "~/shared/const/project";

import { ICreateProjectInput } from "./types";

export const initialProjectValues: ICreateProjectInput = {
  name: "",
  type: ProjectType.Scrum,
};

export const editProjectSchema = yup.object().shape({
  name: yup.string().min(PROJECT_INPUT_LIMITS.NAME_MIN).max(PROJECT_INPUT_LIMITS.NAME_MAX).required("Name is required"),
  type: yup.string().oneOf(Object.values(ProjectType)).required("Type is required"),
});

export const inviteMemberSchema = yup.object().shape({
  email: yup.string().email().required(),
});
