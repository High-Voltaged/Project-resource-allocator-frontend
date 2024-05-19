import { useQuery } from "@apollo/client";
import { Badge, Heading, Skeleton, Text } from "@radix-ui/themes";

import { GET_TICKETS_BY_PROJECT_ID } from "~/shared/graphql/ticket";
import { QueryOutput } from "~/shared/types";
import { ITicket, TicketStatus } from "~/shared/types/ticket";
import { TicketStatusItems } from "~/shared/const/ticket";

import TicketItem from "./TicketItem";

interface TicketContainerProps {
  projectId: string;
}

const TicketContainer: React.FC<TicketContainerProps> = ({ projectId }) => {
  const { data, loading } = useQuery<QueryOutput<ITicket[]>>(GET_TICKETS_BY_PROJECT_ID, {
    variables: { id: projectId },
  });

  const tickets = data?.result || [];
  const filteredTickets = (status: TicketStatus) => tickets.filter((ticket) => ticket.status === status);

  return (
    <>
      <Skeleton loading={loading} />
      <div className="flex items-start space-between w-full space-x-5 max-h-full overflow-y-auto">
        {Object.values(TicketStatus).map((status) => (
          <div key={status} className="flex flex-col items-start flex-1 max-h-full overflow-y-auto space-y-4">
            <div className="flex justify-center w-full">
              <Badge color={TicketStatusItems[status].color as any} size="3">
                <Heading as="h3" size="3">
                  {TicketStatusItems[status].label}
                </Heading>
              </Badge>
            </div>
            <div className="flex flex-col items-center w-full flex-1 space-y-4 py-4 px-2">
              {filteredTickets(status).length ? (
                filteredTickets(status).map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
              ) : (
                <Text as="div" size="3" weight="medium">
                  No tickets with this status.
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TicketContainer;
