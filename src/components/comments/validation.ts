import * as yup from "yup";

const CONTENT_MIN_LIMIT = 4;
const CONTENT_MAX_LIMIT = 200;

const addCommentSchema = yup.object().shape({
  content: yup.string().min(CONTENT_MIN_LIMIT).max(CONTENT_MAX_LIMIT).required("Content is required"),
});

export default addCommentSchema;
