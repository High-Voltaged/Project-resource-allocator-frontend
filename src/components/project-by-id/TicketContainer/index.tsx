import { useQuery } from "@apollo/client";
import { Badge, Card, Heading, Skeleton } from "@radix-ui/themes";

import { GET_TICKETS_BY_PROJECT_ID } from "~/shared/graphql/ticket";
import { QueryOutput } from "~/shared/types";
import { ITicket, TicketStatus } from "~/shared/types/ticket";

import { TicketStatusColors } from "./const";

interface TicketContainerProps {
  projectId: string;
}

const TicketContainer: React.FC<TicketContainerProps> = ({ projectId }) => {
  const { data, loading } = useQuery<QueryOutput<ITicket[]>>(GET_TICKETS_BY_PROJECT_ID, {
    variables: { id: projectId },
  });

  const tickets = data?.result || [];

  return (
    <>
      <Skeleton loading={loading} />
      <div className="flex items-start space-between w-full space-x-5 flex-1 h-full">
        {Object.values(TicketStatus).map((status) => (
          <div key={status} className="flex flex-col items-start flex-1 h-full space-y-4">
            <div className="flex justify-center w-full">
              <Badge color={TicketStatusColors[status] as any} size="3">
                <Heading as="h3" size="3">
                  {status}
                </Heading>
              </Badge>
            </div>
            <div className="flex flex-col items-center w-full flex-1 p-4 bg-slate-200 rounded-xl">
              {tickets
                .filter((ticket) => ticket.status === status)
                .map((ticket) => (
                  <Card key={ticket.name} size="2" className="w-full cursor-pointer">
                    {ticket.name}
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TicketContainer;
