import { useMutation } from "@apollo/client";
import { Button, Heading, Popover, TextArea } from "@radix-ui/themes";
import { useFormik } from "formik";
import { MessageSquareDiffIcon } from "lucide-react";

import { ADD_COMMENT_TO_TICKET, GET_COMMENTS_BY_ID } from "~/shared/graphql/comment";

import { IAddCommentInput } from "./types";
import addCommentSchema from "./validation";

interface CommentsHeaderProps {
  ticketId: string;
}

const CommentsHeader: React.FC<CommentsHeaderProps> = ({ ticketId }) => {
  const [addComment, { loading }] = useMutation<boolean, IAddCommentInput>(ADD_COMMENT_TO_TICKET, {
    refetchQueries: [GET_COMMENTS_BY_ID],
  });

  const formik = useFormik<{ content: string }>({
    initialValues: { content: "" },
    validationSchema: addCommentSchema,
    onSubmit: async ({ content }) => {
      await addComment({
        variables: { ticketId, content },
      });
      formik.resetForm();
    },
  });

  return (
    <div className="flex items-center justify-between space-x-2">
      <Heading as="h3" size="4" className="w-full">
        Comments
      </Heading>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft" color="blue" className="cursor-pointer" loading={loading}>
            <MessageSquareDiffIcon />
            Add a comment
          </Button>
        </Popover.Trigger>
        <Popover.Content width="360px">
          <div className="flex flex-col items-start w-full space-y-4">
            <TextArea
              id="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="soft"
              color="blue"
              placeholder="Write a comment"
              className="w-full h-20"
            />
            {formik.touched.content && formik.errors.content && (
              <p className="w-full pl-2 text-sm text-red-500 !mt-1">{formik.errors.content}</p>
            )}
            <div className="flex w-full justify-end">
              <Popover.Close>
                <Button onClick={() => formik.handleSubmit()} size="2" variant="outline" color="blue">
                  Comment
                </Button>
              </Popover.Close>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default CommentsHeader;
