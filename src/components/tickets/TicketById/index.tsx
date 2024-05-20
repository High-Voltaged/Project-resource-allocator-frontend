import { Separator, Text } from "@radix-ui/themes";
import { ITicket } from "~/shared/types/ticket";
import CommentContainer from "~/components/comments/CommentContainer";
import TicketDetails from "./TicketDetails";
import TicketBar from "./TicketBar";

interface TicketByIdProps {
  ticket: ITicket;
}

const TicketById: React.FC<TicketByIdProps> = ({ ticket }) => {
  return (
    <div className="flex flex-col items-start space-y-6 w-full h-full">
      <TicketBar ticket={ticket} />
      <Separator size="4" className="bg-slate-300" />
      <div className="flex items-start space-x-20 w-full">
        <div className="flex flex-col flex-1 space-y-8">
          <div className="flex-1 px-8 py-6 rounded-b-xl rounded-x-xl bg-slate-200 whitespace-break-spaces">
            <Text as="div" className="text-[17px] whitespace-break-spaces">
              {ticket.description}
            </Text>
          </div>

          <CommentContainer ticketId={ticket.id} />
        </div>
        <TicketDetails ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketById;
