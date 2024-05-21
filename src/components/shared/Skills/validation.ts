import * as yup from "yup";

const NAME_MIN_LIMIT = 2;
const NAME_MAX_LIMIT = 20;

const addSkillSchema = yup.object().shape({
  name: yup.string().min(NAME_MIN_LIMIT).max(NAME_MAX_LIMIT).required("Name is required"),
});

export default addSkillSchema;
