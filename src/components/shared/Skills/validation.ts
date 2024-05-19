import * as yup from "yup";

const NAME_MIN_LIMIT = 2;

const addSkillSchema = yup.object().shape({
  name: yup.string().min(NAME_MIN_LIMIT).required("Name is required"),
});

export default addSkillSchema;
