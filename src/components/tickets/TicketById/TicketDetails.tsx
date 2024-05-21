import { Avatar, Badge, Button, Heading, Text } from "@radix-ui/themes";

import { ITicket } from "~/shared/types/ticket";
import { getUserNameLabel } from "~/shared/utils";
import { TicketDateFormatter, TicketPriorityIcons, TicketStatusItems } from "~/shared/const/ticket";

import Assignees from "./Assignees";
import SkillSelect from "~/components/shared/Skills/TicketSkillSelect";

interface TicketDetailsProps {
  ticket: ITicket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  const PriorityIcon = TicketPriorityIcons[ticket.priority].icon;
  const priorityColor = TicketPriorityIcons[ticket.priority].color;

  const dueDate = ticket.dueTo ? TicketDateFormatter.format(new Date(ticket.dueTo)) : null;

  return (
    <div className="flex flex-col items-start space-y-8 w-[34rem] px-6">
      <div className="flex flex-col items-start space-y-2 w-full">
        <Heading as="h4" size="3">
          Reporter
        </Heading>
        <div className="flex items-center space-x-4 w-full">
          <Avatar fallback={getUserNameLabel(ticket.reporter)} />
          <Text as="span" size="2">
            {ticket.reporter.lastName} {ticket.reporter.firstName}
          </Text>
        </div>
      </div>

      <div className="flex flex-col items-start space-y-2 w-full">
        <Heading as="h4" size="3">
          Status
        </Heading>
        <Badge color={TicketStatusItems[ticket.status].color as any} size="3" className="px-4">
          <Text as="span" size="2">
            {TicketStatusItems[ticket.status].label}
          </Text>
        </Badge>
      </div>

      <div className="flex flex-col items-start space-y-2 w-full">
        <Heading as="h4" size="3">
          Priority
        </Heading>
        <Button size="2" variant="solid" className="shadow-inset" color={priorityColor as any}>
          <Text as="span" size="2" className="text-white">
            {ticket.priority}
          </Text>
          <PriorityIcon color="white" />
        </Button>
      </div>

      <div className="flex flex-col items-start space-y-2 w-full">
        <Heading as="h4" size="3">
          Due Date
        </Heading>

        {dueDate ? (
          <Badge size="3" variant="soft" color="red">
            {dueDate}
          </Badge>
        ) : (
          <Text as="span" size="2">
            None
          </Text>
        )}
      </div>

      <Assignees ticket={ticket} />

      <div className="flex flex-col items-start space-y-2 w-full">
        <Heading as="h4" size="3">
          Required Skills
        </Heading>

        <SkillSelect ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketDetails;
