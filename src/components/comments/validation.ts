import * as yup from "yup";

const CONTENT_MIN_LIMIT = 4;

const addCommentSchema = yup.object().shape({
  content: yup.string().min(CONTENT_MIN_LIMIT).required("Content is required"),
});

export default addCommentSchema;
