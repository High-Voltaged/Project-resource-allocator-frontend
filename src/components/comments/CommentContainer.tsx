import { useQuery } from "@apollo/client";
import { Skeleton, Text } from "@radix-ui/themes";
import React from "react";
import { GET_COMMENTS_BY_ID } from "~/shared/graphql/comment";
import { ICommentsByIdVars } from "./types";
import { QueryOutput } from "~/shared/types";
import { IComment } from "~/shared/types/comment";
import CommentCard from "./CommentCard";
import CommentsHeader from "./CommentsHeader";

interface CommentContainerProps {
  ticketId: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ ticketId }) => {
  const { data, loading } = useQuery<QueryOutput<IComment[]>, ICommentsByIdVars>(GET_COMMENTS_BY_ID, {
    variables: { id: ticketId },
  });

  const comments = data?.result || [];

  return (
    <>
      <CommentsHeader ticketId={ticketId} />
      <div className="flex-1 flex flex-col items-start w-3/4 space-y-4">
        <Skeleton loading={loading} className="w-full h-30" />

        {comments.length ? (
          comments.map((c) => <CommentCard key={c.id} comment={c} />)
        ) : (
          <Text as="div" size="3" weight="medium">
            No comments for this ticket yet.
          </Text>
        )}
      </div>
    </>
  );
};

export default CommentContainer;
