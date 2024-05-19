import { Avatar, Heading, Text } from "@radix-ui/themes";

import { ITicket } from "~/shared/types/ticket";
import { getUserNameLabel } from "~/shared/utils";

import Assignees from "./Assignees";

interface TicketDetailsProps {
  ticket: ITicket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <div className="flex flex-col items-start space-y-8 w-[34rem] px-6">
      <div className="flex flex-col items-start space-y-2 w-full">
        <Heading as="h4" size="3">
          Reporter
        </Heading>
        <div className="flex items-center space-x-4 w-full">
          <Avatar fallback={getUserNameLabel(ticket.reporter)} />
          <Text as="span" size="3">
            {ticket.reporter.lastName} {ticket.reporter.firstName}
          </Text>
        </div>
      </div>
      <Assignees ticket={ticket} />
    </div>
  );
};

export default TicketDetails;
