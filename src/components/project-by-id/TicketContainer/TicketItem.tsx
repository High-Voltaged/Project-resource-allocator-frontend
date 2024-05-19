import { Avatar, Badge, Card, IconButton, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { getUserNameLabel } from "~/shared/utils";
import { ITicket } from "~/shared/types/ticket";

import { BaseRoutes } from "~/shared/const/routes";
import { TicketDateFormatter, TicketPriorityIcons } from "~/shared/const/ticket";

interface TicketItemProps {
  ticket: ITicket;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  const navigate = useNavigate();
  const PriorityIcon = TicketPriorityIcons[ticket.priority].icon;
  const priorityColor = TicketPriorityIcons[ticket.priority].color;

  const dueDate = ticket.dueTo ? TicketDateFormatter.format(new Date(ticket.dueTo)) : null;

  const ticketPath = `${BaseRoutes.TICKETS}/${ticket.id}`;

  return (
    <Card
      key={ticket.title}
      size="2"
      onClick={() => navigate(ticketPath)}
      className="flex flex-col items-start py-4 px-5 w-full space-y-2 shadow-md transition-transform duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer"
    >
      <Text as="div" size="3" weight="medium" className="w-full">
        {ticket.title}
      </Text>
      <div className={clsx("flex items-center w-full space-x-4", dueDate ? "justify-between" : "justify-end")}>
        {dueDate && (
          <Badge size="2" variant="soft" color="red">
            {dueDate}
          </Badge>
        )}
        <div className="flex items-center space-x-2">
          <IconButton size="2" variant="solid" className="shadow-inset" color={priorityColor as any}>
            <PriorityIcon color="white" />
          </IconButton>
          <Avatar size="2" fallback={getUserNameLabel(ticket.reporter)} />
        </div>
      </div>
    </Card>
  );
};

export default TicketItem;
