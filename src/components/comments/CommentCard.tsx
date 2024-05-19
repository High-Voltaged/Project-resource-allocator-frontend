import { useMutation } from "@apollo/client";
import { Avatar, Card, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useSelector } from "react-redux";

import { TicketDateFormatter } from "~/shared/const/ticket";
import { DELETE_COMMENT, GET_COMMENTS_BY_ID } from "~/shared/graphql/comment";
import { IComment } from "~/shared/types/comment";
import { getUserNameLabel } from "~/shared/utils";
import { RootState } from "~/state";

interface ICommentCardProps {
  comment: IComment;
}

const CommentCard: React.FC<ICommentCardProps> = ({ comment }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isAuthor = user ? user.id === comment.author.id : false;
  const createdAt = TicketDateFormatter.format(new Date(comment.createdAt));

  const [deleteComment, { loading }] = useMutation<boolean, { id: string }>(DELETE_COMMENT, {
    variables: { id: comment.id },
    refetchQueries: [GET_COMMENTS_BY_ID],
  });

  return (
    <Card size="1" variant="classic" className="flex flex-col items-start w-full rounded-xl px-8 py-3 bg-indigo-200">
      <div className="w-full">
        <Text as="span" size="1" weight="medium">
          Published at {createdAt}
        </Text>
      </div>
      <div className="w-full mt-1">
        <Text as="p" size="3" className="whitespace-break-spaces">
          {comment.content}
        </Text>
      </div>
      <div className={clsx("flex items-center w-full space-x-2 mt-3", isAuthor ? "justify-between" : "justify-end")}>
        {isAuthor && (
          <IconButton
            size="1"
            variant="soft"
            color="red"
            className="cursor-pointer"
            loading={loading}
            onClick={() => deleteComment()}
          >
            <Trash2Icon className="w-3 h-3" />
          </IconButton>
        )}
        <div className="flex items-center space-x-2">
          <Text as="span" size="1">
            {comment.author.firstName} {comment.author.lastName}
          </Text>
          <Avatar size="1" fallback={getUserNameLabel(comment.author)} />
        </div>
      </div>
    </Card>
  );
};

export default CommentCard;
